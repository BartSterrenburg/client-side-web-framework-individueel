import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate,
    isString
} from 'class-validator';
import {
    ICreatePost,
    IUpdatePost,
    IUpsertPost,
    IUserIdentity,
} from '@train-repo/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreatePostDto implements ICreatePost {
    @IsString()
    description!: string;

    @IsString()
    picture!: string;

    @IsBoolean()
    isCommentable!: boolean;
}

export class UpsertPostDto implements IUpsertPost {
    @IsString()
    id!: string;

    @IsString()
    description!: string;

    @IsString()
    picture!: string;

    @IsBoolean()
    isCommentable!: boolean;

    @IsBoolean()
    isActive!: boolean;

    @IsDate()
    createdAt!: Date;

    @IsDate()
    updatedAt!: Date;

}

export class UpdatePostDto implements IUpdatePost {}
