import { HttpException, Injectable, Logger } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Train as TrainModel, TrainDocument } from './train.schema';
import { ITrain } from '@train-repo/shared/api';
import { CreateTrainDto, UpdateTrainDto } from '@train-repo/backend/dto';
import { UserDocument, User as UserModel } from '@train-repo/backend/user';
import { Neo4JService } from './../../../../neo4j/src/lib/neo4j.service'

@Injectable()
export class TrainService {
    private readonly logger: Logger = new Logger(TrainService.name);

    constructor(
        @InjectModel(TrainModel.name) private trainModel: Model<TrainDocument>, private neo4jService: Neo4JService
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
        let result: any

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
            result = await this.trainModel.create(createdItem);
            this.logger.log(`Train successfully created: ${JSON.stringify(result)}`);

            const neoResult = await this.neo4jService.createTrain(
                result._id.toString(),
                result.name,
                result.sort,
                result.model,
                result.operator
            );
            console.log("Result mongoDb: " + result + ", Result neo4j: " + neoResult);

            let possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
        
            for (let i = 0; i < 4; i++) {           
                const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
                const randomNumber = possibleNumbers[randomIndex];
            
                possibleNumbers.splice(randomIndex, 1);
                
                await this.neo4jService.createTrainStationRelationship(
                    result._id.toString(),
                    randomNumber, 
                    15
                );
            }
            

            return result;
        } catch (error) {
            this.logger.error(`Error creating train`);
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
