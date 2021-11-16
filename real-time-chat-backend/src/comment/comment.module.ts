import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
