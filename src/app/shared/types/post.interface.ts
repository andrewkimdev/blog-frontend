import { User } from 'src/app/shared/types/author.interface';

export interface Post {
  id: number | null;
  authorId: number | null;
  author?: User;
  title: string;
  body: string;
  category: string | null;
  tags: string[];
  mainImage: string | null;
  imageIdList: string[];
  isDraft: boolean;
  createdAt: number;
  updatedAt: number | null;
}
