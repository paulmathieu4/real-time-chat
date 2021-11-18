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

@Controller('comment')
export class CommentController {
    private readonly logger = new Logger(CommentController.name);
    constructor(private commentService: CommentService) {}

    @Post()
    async create(@Body() upsertCommentDto: UpsertCommentDto): Promise<string> {
        this.logger.debug('create endpoint called!');
        if (!upsertCommentDto.channelId) {
            if (!upsertCommentDto.geoReferenceId && !upsertCommentDto.orderId) {
                throw new HttpException(
                    'At least one of the following body param should be provided: channelId, geoReferenceId, orderId',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
        await this.commentService.create(upsertCommentDto);
        return 'comment created';
    }
}
