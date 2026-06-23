import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstagramModule } from './instagram/instagram.module';
import { AnalysisModule } from './analysis/analysis.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    InstagramModule,
    AnalysisModule,
  ],
})
export class AppModule {}
