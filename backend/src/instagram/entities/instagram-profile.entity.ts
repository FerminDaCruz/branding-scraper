import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InstagramPost } from './instagram-post.entity';

@Entity('instagram_profiles')
export class InstagramProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  profilePicUrl: string;

  @Column({ nullable: true })
  website: string;

  @Column({ default: 0 })
  followersCount: number;

  @Column({ default: 0 })
  followingCount: number;

  @Column({ default: 0 })
  postsCount: number;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isBusinessAccount: boolean;

  @Column({ nullable: true })
  businessCategory: string;

  @Column({ nullable: true })
  businessEmail: string;

  @Column({ nullable: true })
  businessPhone: string;

  @OneToMany(() => InstagramPost, (post) => post.profile, { cascade: true })
  posts: InstagramPost[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
