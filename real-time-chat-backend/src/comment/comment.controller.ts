import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Logger,
    Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { UpsertCommentDto } from './comment-dto.model';
import { UserService } from '../authentication/user.service';

@Controller('comment')
export class CommentController {
    private readonly logger = new Logger(CommentController.name);
    constructor(
        private commentService: CommentService,
        private userService: UserService,
    ) {}

    @Post()
    async create(@Body() upsertCommentDto: UpsertCommentDto): Promise<string> {
        const connectedUser = this.userService.getConnectedUser(false);
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
        await this.commentService.create(upsertCommentDto, connectedUser.id);
        return 'comment created';
    }
}
