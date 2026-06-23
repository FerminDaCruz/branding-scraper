import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { ScrapeProfileDto } from './dto/scrape-profile.dto';
import { InstagramProfile } from './entities/instagram-profile.entity';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagram: InstagramService) {}

  @Post('scrape')
  scrape(@Body() dto: ScrapeProfileDto): Promise<InstagramProfile> {
    return this.instagram.scrapeAndSave(dto.username);
  }

  @Get()
  findAll(): Promise<InstagramProfile[]> {
    return this.instagram.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string): Promise<InstagramProfile> {
    return this.instagram.findByUsername(username);
  }
}
