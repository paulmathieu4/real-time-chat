import { Controller, Delete, Get, Logger, Param, Sse } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Channel } from './channel.schema';
import { Comment } from './../comment/comment.schema';
import {
    DeleteChannelParams,
    GetChannelCommentsParams,
} from './channel-dto.model';
import { interval, map, Observable } from 'rxjs';
import { CommentsStreamManagerService } from '../comment/comments-stream-manager/comments-stream-manager.service';

@Controller('channel')
export class ChannelController {
    private readonly logger = new Logger(ChannelController.name);
    constructor(private channelService: ChannelService) {}

    @Get()
    async getChannels(): Promise<Channel[]> {
        return await this.channelService.findAll();
    }

    // TODO: only allow admins
    @Delete(':id')
    async deleteChannel(@Param() params: DeleteChannelParams) {
        await this.channelService.delete(params.id);
    }
}
