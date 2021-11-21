import {
    Body,
    Controller,
    Get,
    Headers,
    HttpException,
    HttpStatus,
    Logger,
    Post,
    Query,
    SetMetadata,
    Sse,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetCommentQueryParams, UpsertCommentDto } from './comment-dto.model';
import { UserService } from '../authentication/user.service';
import { Comment, CommentDocument } from './comment.schema';
import { CommentsStreamManagerService } from './comments-stream-manager/comments-stream-manager.service';
import { Observable } from 'rxjs';
import { disableAuthMetadataKey } from '../authentication/is-authenticated.guard';

@Controller('comment')
export class CommentController {
    private readonly logger = new Logger(CommentController.name);
    constructor(
        private commentService: CommentService,
        private userService: UserService,
        private commentStreamManager: CommentsStreamManagerService,
        private commentsStreamManager: CommentsStreamManagerService,
    ) {}

    @Get()
    async getAllChannelComments(
        @Query() queryParams: GetCommentQueryParams,
    ): Promise<Comment[]> {
        return await this.commentService.findByChannelId(queryParams.channelId);
    }

    @SetMetadata(disableAuthMetadataKey, true)
    @Sse('stream')
    async getNewCommentsStream(
        @Query() queryParams: GetCommentQueryParams,
    ): Promise<Observable<MessageEvent<Comment>>> {
        this.logger.debug('comment stream endpoint called');
        return await this.commentsStreamManager.getChannelCommentsStream(
            queryParams.channelId,
        );
    }

    @Post()
    async create(
        @Body() upsertCommentDto: UpsertCommentDto,
        @Headers() headers,
    ): Promise<any> {
        const connectedUser =
            this.userService.getConnectedUserFromHeaders(headers);
        this.logger.debug('create endpoint called!');
        if (
            !upsertCommentDto.channelId &&
            !upsertCommentDto.geoReferenceId &&
            !upsertCommentDto.orderId
        ) {
            throw new HttpException(
                'At least one of the following body param should be provided: channelId, geoReferenceId, orderId',
                HttpStatus.BAD_REQUEST,
            );
        }
        const createdComment: CommentDocument =
            await this.commentService.create(
                upsertCommentDto,
                connectedUser.id,
            );
        await this.commentStreamManager.emitNewComment(
            upsertCommentDto.channelId,
            createdComment,
        );

        return createdComment;
    }
}
