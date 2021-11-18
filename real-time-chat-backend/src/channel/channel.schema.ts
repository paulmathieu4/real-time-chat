import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
    @Prop({
        required: true,
    })
    userId: string;

    @Prop({
        required: false,
    })
    orderId?: number;

    @Prop({
        required: false,
    })
    geoReferenceId?: number;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
