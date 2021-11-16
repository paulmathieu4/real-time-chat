import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  channelId: number;

  @Prop({
    required: true,
  })
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
