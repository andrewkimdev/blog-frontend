import { Post } from '../types';

export const duplicatePost = (source: Post): Post => {
  return { ...source, tags: [...source.tags], imageIdList: [...source.imageIdList]};
}
