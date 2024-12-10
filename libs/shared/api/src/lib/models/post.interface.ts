import { Id } from './id.type';

export interface IPost {
    id: Id;
    description: string;
    picture: string;
    isCommentable: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type ICreatePost = Pick<IPost, 'description' | 'picture' | 'isCommentable'>;
export type IUpdatePost = Partial<Omit<IPost, 'id'>>;
export type IUpsertPost = IPost;
