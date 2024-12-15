import { IComment } from '@train-repo/shared/api';
import { Id } from '../id.model';
import { IUserInfo } from './../../api/src/lib/models/user.interface';

export class Post {
  _id: Id;
  description: string;
  picture: string;
  isCommentable: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  train: string;
  owner: IUserInfo;
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
    owner: IUserInfo,
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
    this.owner = owner;
    this.comments = comments;
  }
}
