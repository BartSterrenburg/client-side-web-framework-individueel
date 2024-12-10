import { Id } from '../id.model';

export class Post {
  id: Id;
  description: string;
  picture: string;
  isCommentable: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: Id,
    description: string,
    picture: string,
    isCommentable: boolean,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
    ) {
    this.id = id;
    this.description = description;
    this.picture = picture;
    this.isCommentable = isCommentable;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
