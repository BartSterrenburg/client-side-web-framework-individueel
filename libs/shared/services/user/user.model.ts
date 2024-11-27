import { Train } from './../train/train.model';
import { IToken, IUserRegistration } from './auth.model';
import { Id } from './../id.model';

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

export interface IUserIdentity { // extends IEntity {
    name: string;
    emailAddress: string;
    profileImgUrl: string;
    role: UserRole;
    token?: string;
}

export interface IUserInfo extends IUserRegistration {
    _id: Id;
    profileImgUrl: string;
    role: UserRole;
    gender: UserGender;
    isActive: boolean;
}

export interface IUser extends IUserInfo {
    trains: Train[];
}