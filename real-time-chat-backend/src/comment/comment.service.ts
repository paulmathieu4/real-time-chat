import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument } from './comment.schema';
import { UpsertCommentDto } from './comment-dto.model';
import { Comment } from './comment.schema';
import { ChannelService } from '../channel/channel.service';
import { ChannelDocument } from '../channel/channel.schema';

@Injectable()
export class CommentService {
    private readonly logger = new Logger(CommentService.name);

    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private channelService: ChannelService,
    ) {}

    async create(
        commentDto: UpsertCommentDto,
        userId: string,
    ): Promise<CommentDocument> {
        let commentChannelId;
        if (commentDto.channelId) {
            this.logger.debug('Creating comment with channelId provided');
            if (!(await this.channelService.exists(commentDto.channelId))) {
                throw new Error(
                    `The channel ID of the comment does not exist : ${commentDto.channelId}`,
                );
            }
            commentChannelId = commentDto.channelId;
        } else {
            this.logger.debug('Creating comment with no channelId provided');
            const createdChannel: ChannelDocument =
                await this.channelService.create({
                    userId: userId,
                    orderId: commentDto.orderId,
                    geoReferenceId: commentDto.geoReferenceId,
                });
            this.logger.debug(
                'Created channel: ' + JSON.stringify(createdChannel),
            );
            commentChannelId = createdChannel._id;
        }
        const createdComment = new this.commentModel({
            channelId: commentChannelId,
            text: commentDto.text,
            userId: userId,
        });
        return createdComment.save();
    }

    // async findAll(): Promise<Cat[]> {
    //   return this.commentModel.find().exec();
    // }
}
