import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { IUserInfo } from '@train-repo/shared/api';
// import { Meal, MealDocument } from '@train-repo/backend/features';
import { CreateUserDto, UpdateUserDto } from '@train-repo/backend/dto';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument> // @InjectModel(Meal.name) private meetupModel: Model<MealDocument>
    ) {}

    async findAll(): Promise<IUserInfo[]> {
        this.logger.log(`Finding all items`);
        const items = await this.userModel.find();
        return items;
    }

    async findOne(_id: string): Promise<IUserInfo | null> {
        this.logger.log(`finding user with id ${_id}`);
        const item = await this.userModel.findOne({ _id }).exec();
        if (!item) {
            this.logger.debug('Item not found');
        }
        return item;
    }

    async findOneByEmail(email: string): Promise<IUserInfo | null> {
        this.logger.log(`Finding user by email ${email}`);
        const item = this.userModel
            .findOne({ emailAddress: email })
            .select('-password')
            .exec();
        return item;
    }

    async create(user: CreateUserDto): Promise<IUserInfo> {
        this.logger.log(`Create user ${user.name}`);
        const createdItem = this.userModel.create(user);
        return createdItem;
    }

    async update(_id: string, user: UpdateUserDto): Promise<IUserInfo | null> {
        this.logger.log(`Update user ${user.name}`);
        return this.userModel.findByIdAndUpdate({ _id }, user);
    }

    async delete(_id: string): Promise<string> {
        console.log(`DELETE operation started for user with id: ${_id}`);
        
        const result = await this.userModel.deleteOne({ _id });
        console.log(`Database delete result:`, result);
        
        if (result.deletedCount === 1) {
            console.log(`User with id ${_id} successfully deleted.`);
            return `User with id ${_id} successfully deleted.`;
        } else {
            console.warn(`User with id ${_id} not found.`);
            return `User with id ${_id} not found.`;
        }
    }
    
    
    
}
