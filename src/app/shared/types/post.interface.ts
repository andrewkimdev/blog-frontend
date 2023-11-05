import { User } from 'src/app/shared/types/author.interface';
import { Category } from 'src/app/shared/types/category.interface';

export interface Post {
  id: number | null;
  authorId: number | null;
  author?: User;
  title: string;
  body: string;
  category: Category | null;
  tags: string[];
  mainImage: string | null;
  imageIdList: string[];
  isDraft: boolean;
  createdAt: number;
  updatedAt: number | null;
}
