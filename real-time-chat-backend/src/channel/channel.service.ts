import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel, ChannelDocument } from './channel.schema';

@Injectable()
export class ChannelService {
    constructor(
        @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
    ) {}

    create(channel: Channel): Promise<ChannelDocument> {
        const createdChannel = new this.channelModel(channel);
        return createdChannel.save();
    }

    async exists(channelId: string): Promise<boolean> {
        const result = await this.channelModel.findById(channelId);
        return !!result;
    }

    findOne(
        userId: string,
        geoReferenceId: number,
        orderId: number,
    ): Promise<ChannelDocument> {
        return this.channelModel
            .findOne({
                userId: userId,
                geoReferenceId: geoReferenceId,
                orderId: orderId,
            })
            .exec();
    }

    async findAll(): Promise<Channel[]> {
        return this.channelModel.find().exec();
    }

    async delete(channelId: string): Promise<any> {
        return await this.channelModel.findByIdAndDelete(channelId);
    }
}
