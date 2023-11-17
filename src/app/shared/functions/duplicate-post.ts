import { getCurrentUnixTimeInSeconds } from 'src/app/shared/functions/time.helper';
import { Post } from '../types';

export const duplicatePost = (post: Post, args?: {}): Post => {
  return {
    ...post,
    category: post.category ? { name: post.category.name } : null,
    tags: post.tags?.length > 0 ? [...post.tags] : [],
    updatedAt: getCurrentUnixTimeInSeconds(),
    ...args,
  };
}
