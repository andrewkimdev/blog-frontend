export interface SocialMedia {
  platform: string;
  url: string;
}

export interface Author {
  userId: number;
  name: string;
  email: string;
  profileImage: string;
  bio: string;
  role: string;
  socialMedia: SocialMedia[];
}
