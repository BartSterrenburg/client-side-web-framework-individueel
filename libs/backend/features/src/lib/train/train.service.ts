import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
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
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>
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
        const user_id = req.user.user_id;

        if (train && user_id) {
            this.logger.log(`Create train ${train.name} for ${user_id}`);
            const user = await this.userModel
                .findOne({ _id: user_id })
                .select('-password -trains')
                .exec();
            const createdItem = {
                ...train,
                owner: user
            };
            return this.trainModel.create(createdItem);
        }
        return null;
    }

    async update(_id: string, train: UpdateTrainDto): Promise<ITrain | null> {
        this.logger.log(`Update train`);
        return this.trainModel.findByIdAndUpdate({ _id }, train);
    }
}
