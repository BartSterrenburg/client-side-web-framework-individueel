// import { IEntity } from 'libs/share-a-meal/common/src/lib/entity/entity.model';
import { ITrain } from './train.interface';
import { IToken, IUserRegistration } from './auth.interface';
import { Id } from './id.type';

export enum UserRole {
    Guest = 'Guest',
    Admin = 'Admin',
    Unknown = 'Unknown'
}

export enum UserGender {
    Male = 'Male',
    Female = 'Female',
    None = 'None',
    Unknown = 'Unknown'
}

/**
 * Minimal user information
 */

export interface IUserIdentity { // extends IEntity {
    name: string;
    emailAddress: string;
    profileImgUrl: string;
    role: UserRole;
    token?: string;
}

/**
 * All user information, excl. domain entities
 */
export interface IUserInfo extends IUserRegistration {
    _id: Id;
    profileImgUrl: string;
    role: UserRole;
    gender: UserGender;
    isActive: boolean;
}


export type ICreateUser = Pick<IUserInfo, 'name' | 'password' | 'emailAddress'>;
export type IUpdateUser = Partial<Omit<IUserInfo, 'id'>>;
export type IUpsertUser = IUserInfo;
