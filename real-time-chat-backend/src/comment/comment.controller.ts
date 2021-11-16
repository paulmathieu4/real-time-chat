import { Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  async create(): Promise<string> {
    await this.commentService.create({
      channelId: 1,
      text: 'test',
    });
    return 'comment created';
  }
}
