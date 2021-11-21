import {
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Logger,
    Param,
    Sse,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Channel } from './channel.schema';
import { Comment } from './../comment/comment.schema';
import {
    DeleteChannelParams,
    GetChannelCommentsParams,
} from './channel-dto.model';
import { interval, map, Observable } from 'rxjs';
import { CommentsStreamManagerService } from '../comment/comments-stream-manager/comments-stream-manager.service';
import { Headers } from '@nestjs/common';
import { UserService } from '../authentication/user.service';

@Controller('channel')
export class ChannelController {
    private readonly logger = new Logger(ChannelController.name);
    constructor(
        private channelService: ChannelService,
        private userService: UserService,
    ) {}

    @Get()
    async getChannels(): Promise<Channel[]> {
        return await this.channelService.findAll();
    }

    @Delete(':id')
    async deleteChannel(
        @Param() params: DeleteChannelParams,
        @Headers() headers,
    ) {
        const connectedUser =
            this.userService.getConnectedUserFromHeaders(headers);
        if (!connectedUser.isAdmin) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        await this.channelService.delete(params.id);
    }
}
