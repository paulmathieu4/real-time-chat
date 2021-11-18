import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
    @Prop({
        required: true,
    })
    userId: string;

    @Prop()
    orderId: number;

    @Prop()
    geoReferenceId: number;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
