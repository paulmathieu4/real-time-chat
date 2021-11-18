import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from './channel.schema';
import { ChannelService } from './channel.service';

@Module({
    imports: [],
    providers: [ChannelService],
})
export class ChannelModule {}
