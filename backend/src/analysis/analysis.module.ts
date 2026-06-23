import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { ClaudeService } from './claude/claude.service';
import { Brief } from './entities/brief.entity';
import { InstagramModule } from '../instagram/instagram.module';

@Module({
  imports: [TypeOrmModule.forFeature([Brief]), InstagramModule],
  controllers: [AnalysisController],
  providers: [AnalysisService, ClaudeService],
})
export class AnalysisModule {}
