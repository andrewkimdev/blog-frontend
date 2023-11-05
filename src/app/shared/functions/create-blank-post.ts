import { Post } from '../types';
import { getCurrentUnixTimeInSeconds } from './time.helper';

export const createBlankPost = (): Post =>
  ({
    id: null,
    authorId: null,
    title: '',
    body: '',
    category: null,
    tags: [],
    isDraft: true,
    createdAt: getCurrentUnixTimeInSeconds(),
    updatedAt: null,
    mainImage: null,
    imageIdList: [],
  } as Post);
