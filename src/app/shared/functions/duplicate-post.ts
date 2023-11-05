import { getCurrentUnixTimeInSeconds } from 'src/app/shared/functions/time.helper';
import { Post } from '../types';

export const duplicatePost = (post: Post, args?: {}): Post => {
  return {
    ...post,
    tags: post.tags?.length > 0 ? [...post.tags] : [],
    imageIdList: post.imageIdList?.length > 0 ? [...post.imageIdList] : [],
    updatedAt: getCurrentUnixTimeInSeconds() ,
    ...args,
  };
}
