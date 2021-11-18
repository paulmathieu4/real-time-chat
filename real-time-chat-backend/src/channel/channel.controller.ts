import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Channel } from './channel.schema';
import { DeleteChannelParams } from './channel-dto.model';

@Controller('channel')
export class ChannelController {
    constructor(private channelService: ChannelService) {}

    @Get()
    async getChannels(): Promise<Channel[]> {
        return await this.channelService.findAll();
    }

    // TODO: only allow admins
    @Delete(':id')
    async deleteChannel(@Param() params: DeleteChannelParams): Promise<string> {
        await this.channelService.delete(params.id);
        return `Channel ${params.id} deleted.`;
    }
}
