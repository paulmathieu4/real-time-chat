import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { CommentModule } from '../comment/comment.module';

@Module({
    imports: [],
    providers: [ChannelService],
    controllers: [ChannelController],
})
export class ChannelModule {}
