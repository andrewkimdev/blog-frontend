import { Author } from 'src/app/shared/types/author.interface';

export interface Post {
  id?: number;
  title: string;
  body: string;
  tags: string[];
  isDraft: boolean;
  createdAt?: number;
  updatedAt?: number;
  mainImage?: string;
  category?: string;
  author?: Author;
}
