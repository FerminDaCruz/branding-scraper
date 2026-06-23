import { Controller, Get, Param, Post } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { Brief } from './entities/brief.entity';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysis: AnalysisService) {}

  @Post(':username')
  generate(@Param('username') username: string): Promise<Brief> {
    return this.analysis.analyze(username);
  }

  @Get(':username')
  findOne(@Param('username') username: string): Promise<Brief> {
    return this.analysis.findByUsername(username);
  }

  @Get(':username/web-prompt')
  webPrompt(@Param('username') username: string): Promise<{ prompt: string }> {
    return this.analysis.getWebPrompt(username);
  }
}
