import { Post } from '../types';

export const duplicatePost = (post: Post, args?: {}): Post => {
  return { ...post, tags: [...post.tags], imageIdList: [...post.imageIdList], ...args};
}
