import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApifyService } from './scraper/apify.service';
import { InstagramProfile } from './entities/instagram-profile.entity';
import { InstagramPost } from './entities/instagram-post.entity';
import { ApifyProfileResult, ApifyPost } from './scraper/scraper.types';

@Injectable()
export class InstagramService {
  private readonly logger = new Logger(InstagramService.name);

  constructor(
    @InjectRepository(InstagramProfile)
    private readonly profileRepo: Repository<InstagramProfile>,
    @InjectRepository(InstagramPost)
    private readonly postRepo: Repository<InstagramPost>,
    private readonly apify: ApifyService,
  ) {}

  async scrapeAndSave(username: string): Promise<InstagramProfile> {
    const existing = await this.profileRepo.findOne({
      where: { username },
      relations: ['posts'],
    });
    if (existing) {
      this.logger.log(`Returning cached profile for @${username}`);
      return existing;
    }
    const raw = await this.apify.scrapeProfile(username);
    return this.upsertProfile(raw);
  }

  async findByUsername(username: string): Promise<InstagramProfile> {
    const profile = await this.profileRepo.findOne({
      where: { username },
      relations: ['posts'],
    });
    if (!profile) throw new NotFoundException(`@${username} not found`);
    return profile;
  }

  async findAll(): Promise<InstagramProfile[]> {
    return this.profileRepo.find({ order: { updatedAt: 'DESC' } });
  }

  private async upsertProfile(
    raw: ApifyProfileResult,
  ): Promise<InstagramProfile> {
    this.logger.log(`Upserting profile @${raw.username}`);

    let profile = await this.profileRepo.findOne({
      where: { username: raw.username },
    });

    if (!profile) {
      profile = this.profileRepo.create({ username: raw.username });
    }

    profile.fullName = raw.fullName;
    profile.bio = raw.biography;
    profile.profilePicUrl = raw.profilePicUrl;
    profile.website = raw.externalUrl;
    profile.followersCount = raw.followersCount;
    profile.followingCount = raw.followsCount;
    profile.postsCount = raw.postsCount;
    profile.isVerified = raw.verified;
    profile.isBusinessAccount = raw.isBusinessAccount;
    profile.businessCategory = raw.businessCategoryName;
    profile.businessEmail = raw.businessEmail;
    profile.businessPhone = raw.businessPhoneNumber;

    await this.profileRepo.save(profile);

    if (raw.latestPosts?.length) {
      await this.upsertPosts(profile, raw.latestPosts);
    }

    return this.profileRepo.findOneOrFail({
      where: { id: profile.id },
      relations: ['posts'],
    });
  }

  private async upsertPosts(
    profile: InstagramProfile,
    rawPosts: ApifyPost[],
  ): Promise<void> {
    for (const raw of rawPosts) {
      const existing = await this.postRepo.findOne({
        where: { apifyId: raw.id },
      });

      const post = existing ?? this.postRepo.create({ apifyId: raw.id });

      post.url = raw.url;
      post.caption = raw.caption;
      post.type = raw.type;
      post.likesCount = raw.likesCount;
      post.commentsCount = raw.commentsCount;
      post.videoViewCount = raw.videoViewCount ?? 0;
      post.displayUrl = raw.displayUrl;
      post.hashtags = raw.hashtags ?? [];
      post.mentions = raw.mentions ?? [];
      if (raw.timestamp) post.timestamp = new Date(raw.timestamp);
      post.profile = profile;

      await this.postRepo.save(post);
    }
  }
}
