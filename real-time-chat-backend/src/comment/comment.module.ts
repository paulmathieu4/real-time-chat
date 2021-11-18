import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './comment.schema';
import { ChannelService } from '../channel/channel.service';

@Module({
    imports: [],
    providers: [CommentService, ChannelService],
    controllers: [CommentController],
})
export class CommentModule {}
