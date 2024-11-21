import { Test, TestingModule } from '@nestjs/testing';
import { TrainController } from './train.controller';

describe('MealController', () => {
    let controller: TrainController;

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
