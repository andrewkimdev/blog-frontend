import { Post } from '../types';

export const duplicatePost = (post: Post): Post => {
  return { ...post, tags: [...post.tags], imageIdList: [...post.imageIdList]};
}
