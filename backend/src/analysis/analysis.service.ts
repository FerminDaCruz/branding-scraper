import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstagramService } from '../instagram/instagram.service';
import { ClaudeService } from './claude/claude.service';
import { buildBriefPrompt } from './prompts/brief-prompt.builder';
import { buildWebPrompt } from './prompts/web-prompt.builder';
import { Brief } from './entities/brief.entity';

@Injectable()
export class AnalysisService {
  private readonly logger = new Logger(AnalysisService.name);

  constructor(
    @InjectRepository(Brief)
    private readonly briefRepo: Repository<Brief>,
    private readonly instagram: InstagramService,
    private readonly claude: ClaudeService,
  ) {}

  async analyze(username: string): Promise<Brief> {
    const profile = await this.instagram.findByUsername(username);
    if (!profile.posts?.length) {
      throw new NotFoundException(`@${username} has no posts to analyze`);
    }

    const existing = await this.briefRepo.findOne({
      where: { profile: { id: profile.id } },
      relations: ['profile'],
    });

    if (existing) {
      this.logger.log(`Returning cached brief for @${username}`);
      return existing;
    }

    this.logger.log(`Generating brief for @${username} (${profile.posts.length} posts)`);

    const prompt = buildBriefPrompt(profile);
    const output = await this.claude.generateBrief(prompt);

    const brief = this.briefRepo.create();
    brief.profile = profile;
    brief.businessInfo = output.businessInfo;
    brief.mainOffer = output.mainOffer;
    brief.secondaryOffer = output.secondaryOffer ?? '';
    brief.targetAudience = output.targetAudience;
    brief.mainPain = output.mainPain;
    brief.desires = output.desires;
    brief.positioning = output.positioning;
    brief.communicationStyle = output.communicationStyle;
    brief.contentTopics = output.contentTopics;
    brief.ctasUsed = output.ctasUsed;
    brief.detectedFunnel = output.detectedFunnel;
    brief.improvementOpportunities = output.improvementOpportunities;
    brief.webRecommendations = output.webRecommendations;
    brief.fullBrief = output.fullBrief;

    return this.briefRepo.save(brief);
  }

  async findByUsername(username: string): Promise<Brief> {
    const brief = await this.briefRepo.findOne({
      where: { profile: { username } },
      relations: ['profile'],
    });
    if (!brief) throw new NotFoundException(`No brief found for @${username}`);
    return brief;
  }

  async getWebPrompt(username: string): Promise<{ prompt: string }> {
    const brief = await this.briefRepo.findOne({
      where: { profile: { username } },
      relations: ['profile'],
    });
    if (!brief) throw new NotFoundException(`No brief found for @${username}`);
    return { prompt: buildWebPrompt(brief, brief.profile) };
  }
}
