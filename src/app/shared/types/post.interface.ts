import { User } from 'src/app/shared/types/author.interface';

export interface Post {
  id: number | null;
  authorId: number | null;
  author?: User;
  title: string;
  body: string;
  category?: string;
  tags: string[];
  mainImage?: string;
  imageIdList: string[];
  isDraft: boolean;
  createdAt?: number;
  updatedAt?: number;
}
