import { Controller, Delete, Logger, Put, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { IPost } from '@train-repo/shared/api';
import { CreatePostDto, UpdatePostDto } from '@train-repo/backend/dto';
import { AuthGuard } from '@train-repo/backend/auth';

@Controller('trainpost')
export class PostController {

    constructor(private postService: PostService) {}

    @Get('train/:id')
    getAll(@Param('id') id: string): Promise<IPost[]> {
        return this.postService.findAll(id);
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IPost | null> {
        return this.postService.findOne(id);
    }

    @Post('')
    @UseGuards(AuthGuard)
    create(@Request() req: any): Promise<IPost | null> {
        return this.postService.create(req);
    }

    // @Put(':id')
    // @UseGuards(AuthGuard)
    // update(@Param('id') id: string, @Body() body: UpdatePostDto): Promise<IPost | null> {
    //     return this.postService.update(id, body);
    // }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        this.postService.delete(id);
    }
}
