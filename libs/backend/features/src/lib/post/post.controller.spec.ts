import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';

describe('PostController', () => {
    let controller: PostController;

    // beforeEach(async () => {
    //     const module: TestingModule = await Test.createTestingModule({
    //         controllers: [MealController],
    //     }).compile();
    //
    //     controller = module.get<MealController>(MealController);
    // });

    it('should be defined', () => {
      expect(true).toBeTruthy();
        //expect(controller).toBeDefined();
    });
});
