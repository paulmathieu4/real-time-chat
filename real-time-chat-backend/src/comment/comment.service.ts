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
            let commentChannel: ChannelDocument;
            const existingChannel: ChannelDocument =
                await this.channelService.findOne(
                    userId,
                    commentDto.geoReferenceId,
                    commentDto.orderId,
                );
            if (existingChannel) {
                this.logger.debug(
                    'Comment channel already exists for trifecta (userId, geoReferenceId, orderId)',
                );
                commentChannel = existingChannel;
            } else {
                this.logger.debug(
                    'Comment channel does not exist for trifecta (userId, geoReferenceId, orderId), create it.',
                );
                commentChannel = await this.channelService.create({
                    userId: userId,
                    orderId: commentDto.orderId,
                    geoReferenceId: commentDto.geoReferenceId,
                });
            }
            commentChannelId = commentChannel._id;
        }
        const createdComment = new this.commentModel({
            channelId: commentChannelId,
            text: commentDto.text,
            userId: userId,
            date: new Date(),
        });
        return createdComment.save();
    }

    async findByChannelId(channelId: string): Promise<Comment[]> {
        return this.commentModel
            .find({ channelId: channelId })
            .sort({ date: 'asc' })
            .exec();
    }
}
