import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument } from './comment.schema';
import { CreateCommentDto } from './comment-dto.model';
import { Comment } from './comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentDocument> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  // async findAll(): Promise<Cat[]> {
  //   return this.commentModel.find().exec();
  // }
}
