export interface ApifyProfileResult {
  username: string;
  fullName: string;
  biography: string;
  profilePicUrl: string;
  externalUrl: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  verified: boolean;
  isBusinessAccount: boolean;
  businessCategoryName: string;
  businessEmail: string;
  businessPhoneNumber: string;
  latestPosts: ApifyPost[];
}

export interface ApifyPost {
  id: string;
  url: string;
  caption: string;
  type: 'Image' | 'Video' | 'Sidecar';
  likesCount: number;
  commentsCount: number;
  videoViewCount: number;
  displayUrl: string;
  hashtags: string[];
  mentions: string[];
  timestamp: string;
}
