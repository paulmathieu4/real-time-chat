import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from './comment/comment.module';
import { ChannelModule } from './channel/channel.module';
import { ChannelService } from './channel/channel.service';
import { Comment, CommentSchema } from './comment/comment.schema';
import { Channel, ChannelSchema } from './channel/channel.schema';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [CommentModule, ChannelModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService, ChannelService], // TODO: enlever channelService
})
export class AppModule {}
