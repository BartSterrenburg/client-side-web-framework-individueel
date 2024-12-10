import { HttpException, Injectable, Logger } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post as PostModel, PostDocument } from './post.schema';
import { IPost, ITrain } from '@train-repo/shared/api';
import { CreateTrainDto, UpdateTrainDto } from '@train-repo/backend/dto';
import { UserDocument, User as UserModel } from '@train-repo/backend/user';

@Injectable()
export class PostService {
    private readonly logger: Logger = new Logger(PostService.name);

    constructor(
        @InjectModel(PostModel.name) private postModel: Model<PostDocument>,
    ) {}

    /**
     * Zie https://mongoosejs.com/docs/populate.html#population
     *
     * @returns
     */
    async findAll(_id: string): Promise<IPost[]> {
        this.logger.log(`Finding all items`);
        const items = await this.postModel
            .find({"train": _id})
            .populate(
                'owner',
                'description'
            )
            .exec();
        return items;
    }

    async findOne(_id: string): Promise<IPost | null> {
        this.logger.log(`finding post with id ${_id}`);
        const item = await this.postModel.findOne({ _id }).exec();
        if (!item) {
            this.logger.debug('Item not found');
        }
        return item;
    }

    async create(req: any): Promise<IPost | null> {
        const post = req.body;
        const user_id = post.owner;
        const train_id = post.train;
    
        if (!user_id) {
            this.logger.error("User ID is missing in request.");
            throw new Error("User ID is missing.");
        }

        if (!train_id) {
            this.logger.error("Train ID is missing in request.");
            throw new Error("Train ID is missing.");
        }
    
        const createdItem = {
            ...post,
            owner: new mongoose.Types.ObjectId(user_id),
            train: new mongoose.Types.ObjectId(train_id)
        };
    
        this.logger.log(`Creating post with data: ${JSON.stringify(createdItem)}`);
    
        try {
            const result = await this.postModel.create(createdItem);
            this.logger.log(`Post successfully created: ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            this.logger.error(`Error creating train`);
            throw error;
        }
    }
    
    async addCommentToPost(postId: string, content: string): Promise<IPost | null> {
        this.logger.log(`Adding comment to post with id ${postId}`);
    
        // Vind de post met de opgegeven ID
        const post = await this.postModel.findById(postId);
        if (!post) {
          this.logger.error(`Post with id ${postId} not found.`);
          throw new Error('Post not found');
        }
    
        // Voeg een nieuwe comment aan de array toe
        const newComment = {
          content,
          createdAt: new Date(),
        };
    
        post.comments.push(newComment); // Voeg comment toe aan de array
    
        // Sla de post op met de nieuwe comment
        await post.save();
    
        return post;
    }

    // async update(_id: string, train: UpdateTrainDto): Promise<ITrain | null> {
    //     this.logger.log(`Update train`);
    //     return this.trainModel.findByIdAndUpdate({ _id }, train);
    // }

    async delete(_id: string): Promise<string> {
        console.log(`DELETE operation started for post with id: ${_id}`);
        
        const result = await this.postModel.deleteOne({ _id });
        console.log(`Database delete result:`, result);
        
        if (result.deletedCount === 1) {
            console.log(`Post with id ${_id} successfully deleted.`);
            return `Post with id ${_id} successfully deleted.`;
        } else {
            console.warn(`Post with id ${_id} not found.`);
            return `Post with id ${_id} not found.`;
        }
    }
}
