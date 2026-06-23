import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InstagramProfile } from '../../instagram/entities/instagram-profile.entity';

@Entity('briefs')
export class Brief {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => InstagramProfile, { onDelete: 'CASCADE' })
  @JoinColumn()
  profile: InstagramProfile;

  @Column({ type: 'text' })
  businessInfo: string;

  @Column({ type: 'text' })
  mainOffer: string;

  @Column({ type: 'text', nullable: true })
  secondaryOffer: string;

  @Column({ type: 'text' })
  targetAudience: string;

  @Column({ type: 'text' })
  mainPain: string;

  @Column({ type: 'text' })
  desires: string;

  @Column({ type: 'text' })
  positioning: string;

  @Column({ type: 'text' })
  communicationStyle: string;

  @Column({ type: 'jsonb' })
  contentTopics: string[];

  @Column({ type: 'jsonb' })
  ctasUsed: string[];

  @Column({ type: 'text' })
  detectedFunnel: string;

  @Column({ type: 'jsonb' })
  improvementOpportunities: string[];

  @Column({ type: 'jsonb' })
  webRecommendations: string[];

  @Column({ type: 'text', nullable: true })
  fullBrief: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
