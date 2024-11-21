import { Controller, Logger, Request } from '@nestjs/common';
import { TrainService } from './train.service';
import { Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { ITrain } from '@avans-nx-workshop/shared/api';
import { CreateTrainDto } from '@avans-nx-workshop/backend/dto';
import { AuthGuard } from '@avans-nx-workshop/backend/auth';

@Controller('train')
export class TrainController {
    private readonly logger = new Logger(TrainController.name);

    constructor(private trainService: TrainService) {}

    @Get('')
    getAll(): Promise<ITrain[]> {
        return this.trainService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<ITrain | null> {
        return this.trainService.findOne(id);
    }

    @Post('')
    @UseGuards(AuthGuard)
    create(@Request() req: any): Promise<ITrain | null> {
        this.logger.log('req.user.user_id = ', req.user.user_id);
        return this.trainService.create(req);
    }
}
