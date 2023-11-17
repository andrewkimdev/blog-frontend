import { Category } from './category.interface';

export interface Post {
  id: number | null;
  authorId: string | null;
  title: string;
  body: string;
  category: Category | null;
  tags: string[];
  mainImage: string | null;
  isDraft: boolean;
  createdAt: number;
  updatedAt: number | null;
}
