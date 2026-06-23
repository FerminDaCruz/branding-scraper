import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
import { ApifyService } from './scraper/apify.service';
import { InstagramProfile } from './entities/instagram-profile.entity';
import { InstagramPost } from './entities/instagram-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstagramProfile, InstagramPost])],
  controllers: [InstagramController],
  providers: [InstagramService, ApifyService],
  exports: [InstagramService],
})
export class InstagramModule {}
