import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from '../comment/comment.schema';
import { Channel, ChannelSchema } from '../channel/channel.schema';

@Global()
@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/realTimeChat'),
        MongooseModule.forFeature([
            { name: Comment.name, schema: CommentSchema },
        ]),
        MongooseModule.forFeature([
            { name: Channel.name, schema: ChannelSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
