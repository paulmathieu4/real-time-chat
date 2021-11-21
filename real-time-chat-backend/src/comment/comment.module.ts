import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './comment.schema';
import { ChannelService } from '../channel/channel.service';
import { CommentsStreamManagerService } from './comments-stream-manager/comments-stream-manager.service';

@Module({
    imports: [
        CacheModule.register({
            ttl: 100000, // cache expiration time in seconds
        }),
    ],
    providers: [CommentService, ChannelService, CommentsStreamManagerService],
    controllers: [CommentController],
    exports: [CommentsStreamManagerService],
})
export class CommentModule {}
