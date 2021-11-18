import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from './channel.schema';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';

@Module({
    imports: [],
    providers: [ChannelService],
    controllers: [ChannelController],
})
export class ChannelModule {}
