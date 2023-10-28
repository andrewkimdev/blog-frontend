export interface SocialMedia {
  platform: string;
  url: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  bio: string;
  role: string;
  socialMedia: SocialMedia[];
}
