import { IComment } from '@train-repo/shared/api';
import { Id } from '../id.model';

export class Post {
  _id: Id;
  description: string;
  picture: string;
  isCommentable: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  train: string;
  comments: IComment[];

  constructor(
    _id: Id,
    description: string,
    picture: string,
    isCommentable: boolean,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    train: string,
    comments: IComment[]
    ) {
    this._id = _id;
    this.description = description;
    this.picture = picture;
    this.isCommentable = isCommentable;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.train = train;
    this.comments = comments;
  }
}
