import { HttpException, Injectable, Logger } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Train as TrainModel, TrainDocument } from './train.schema';
import { ITrain } from '@train-repo/shared/api';
import { CreateTrainDto, UpdateTrainDto } from '@train-repo/backend/dto';
import { UserDocument, User as UserModel } from '@train-repo/backend/user';

@Injectable()
export class TrainService {
    private readonly logger: Logger = new Logger(TrainService.name);

    constructor(
        @InjectModel(TrainModel.name) private trainModel: Model<TrainDocument>,
    ) {}

    /**
     * Zie https://mongoosejs.com/docs/populate.html#population
     *
     * @returns
     */
    async findAll(): Promise<ITrain[]> {
        this.logger.log(`Finding all items`);
        const items = await this.trainModel
            .find()
            .populate(
                'owner',
                'name emailAddress gender isActive profileImgUrl'
            )
            .exec();
        return items;
    }

    async findOne(_id: string): Promise<ITrain | null> {
        this.logger.log(`finding meal with id ${_id}`);
        const item = await this.trainModel.findOne({ _id }).exec();
        if (!item) {
            this.logger.debug('Item not found');
        }
        return item;
    }

    async create(req: any): Promise<ITrain | null> {
        const train = req.body;
        const user_id = train.owner;
    
        if (!user_id) {
            this.logger.error("User ID is missing in request.");
            throw new Error("User ID is missing.");
        }
    
        const createdItem = {
            ...train,
            owner: new mongoose.Types.ObjectId(user_id),
        };
    
        this.logger.log(`Creating train with data: ${JSON.stringify(createdItem)}`);
    
        try {
            const result = await this.trainModel.create(createdItem);
            this.logger.log(`Train successfully created: ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            this.logger.error(`Error creating train: ${error.message}`);
            throw error;
        }
    }
    

    async update(_id: string, train: UpdateTrainDto): Promise<ITrain | null> {
        this.logger.log(`Update train`);
        return this.trainModel.findByIdAndUpdate({ _id }, train);
    }

    async delete(_id: string): Promise<string> {
        console.log(`DELETE operation started for train with id: ${_id}`);
        
        const result = await this.trainModel.deleteOne({ _id });
        console.log(`Database delete result:`, result);
        
        if (result.deletedCount === 1) {
            console.log(`Train with id ${_id} successfully deleted.`);
            return `Train with id ${_id} successfully deleted.`;
        } else {
            console.warn(`Train with id ${_id} not found.`);
            return `Train with id ${_id} not found.`;
        }
    }
}
