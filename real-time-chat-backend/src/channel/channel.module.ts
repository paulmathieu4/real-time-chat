import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';

@Module({
    imports: [],
    providers: [ChannelService],
    controllers: [ChannelController],
})
export class ChannelModule {}
