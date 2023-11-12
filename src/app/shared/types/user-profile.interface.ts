export interface UserProfile {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  bio: string;
  socialMedia: [
    {
      platform: string;
      url: string;
    }
  ]
}
