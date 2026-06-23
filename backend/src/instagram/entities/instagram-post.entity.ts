import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InstagramProfile } from './instagram-profile.entity';

export type PostType = 'Image' | 'Video' | 'Sidecar';

@Entity('instagram_posts')
export class InstagramPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  apifyId: string;

  @Column()
  url: string;

  @Column({ type: 'text', nullable: true })
  caption: string;

  @Column({ type: 'varchar', nullable: true })
  type: PostType;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  commentsCount: number;

  @Column({ nullable: true })
  videoViewCount: number;

  @Column({ nullable: true })
  displayUrl: string;

  @Column({ type: 'simple-array', nullable: true })
  hashtags: string[];

  @Column({ type: 'simple-array', nullable: true })
  mentions: string[];

  @Column({ nullable: true })
  timestamp: Date;

  @Column({ nullable: true })
  transcript: string;

  @ManyToOne(() => InstagramProfile, (profile) => profile.posts, {
    onDelete: 'CASCADE',
  })
  profile: InstagramProfile;

  @CreateDateColumn()
  createdAt: Date;
}
