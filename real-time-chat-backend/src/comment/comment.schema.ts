import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop()
    channelId: string;

    @Prop({
        required: true,
    })
    text: string;

    @Prop({
        required: true,
    })
    userId: string;

    @Prop({
        required: true,
    })
    date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
