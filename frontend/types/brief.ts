export interface InstagramProfile {
  id: string;
  username: string;
  fullName: string;
  bio: string;
  profilePicUrl: string;
  website: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified: boolean;
  isBusinessAccount: boolean;
  businessCategory: string | null;
  businessEmail: string | null;
}

export interface Brief {
  id: string;
  profile: InstagramProfile;
  businessInfo: string;
  mainOffer: string;
  secondaryOffer: string;
  targetAudience: string;
  mainPain: string;
  desires: string;
  positioning: string;
  communicationStyle: string;
  contentTopics: string[];
  ctasUsed: string[];
  detectedFunnel: string;
  improvementOpportunities: string[];
  webRecommendations: string[];
  fullBrief: string;
  createdAt: string;
  updatedAt: string;
}
