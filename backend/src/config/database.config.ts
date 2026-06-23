import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InstagramProfile } from '../instagram/entities/instagram-profile.entity';
import { InstagramPost } from '../instagram/entities/instagram-post.entity';
import { Brief } from '../analysis/entities/brief.entity';

export const databaseConfig = (): TypeOrmModuleOptions => {
  const useSSL = process.env.DB_SSL === 'true';
  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'instagram_brief',
    entities: [InstagramProfile, InstagramPost, Brief],
    synchronize: true,
    logging: process.env.NODE_ENV === 'development',
    ...(useSSL && { ssl: { rejectUnauthorized: false } }),
  };
};
