import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Comment } from '../../comment/comment.schema';
import { Cache } from 'cache-manager';

@Injectable()
export class CommentsStreamManagerService {
    private prefix = 'COMMENTS_STREAM';
    private logger = new Logger(CommentsStreamManagerService.name);

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
        this.logger.debug('Creating CommentsStreamManagerService');
    }

    /**
     * Given a channelId, this function will look into the application cache and returns
     * the comments stream for that channel. Id the stream does not exist in the cache, it
     * will return a new stream and store it in the cache
     * @param channelId
     */
    async getChannelCommentsStream(
        channelId: string,
    ): Promise<Subject<MessageEvent<Comment>>> {
        const cacheKey = this.getCacheKey(channelId);
        this.logger.debug(
            'Getting comments stream for channel with key: ' + cacheKey,
        );

        const channelCommentsStream = await this.cacheManager.get<
            Subject<MessageEvent<Comment>>
        >(cacheKey);
        if (channelCommentsStream) {
            this.logger.debug('Comments stream found in cache, returning it.');
            return channelCommentsStream;
        } else {
            this.logger.debug(
                'Comments stream not found in cache, creating it.',
            );
            const newStream = new Subject<MessageEvent<Comment>>();
            this.logger.debug('Setting cache for key ' + cacheKey);
            await this.cacheManager.set<Subject<MessageEvent<Comment>>>(
                cacheKey,
                newStream,
            );

            return newStream;
        }
    }

    /**
     * This function, given a channelId and a comment, will find the comments stream
     * in the application cache for that channel, and emits the data of the given
     * comment on the stream
     * @param channelId
     * @param comment
     */
    async emitNewComment(channelId: string, comment: Comment): Promise<void> {
        this.logger.debug(
            'Emitting new comment in stream for channel, cache key: ' +
                this.getCacheKey(channelId),
        );
        const commentsStream = await this.cacheManager.get<
            Subject<MessageEvent<Comment>>
        >(this.getCacheKey(channelId));
        if (!commentsStream) {
            this.logger.warn(
                'No comments stream found in cache for channel ' + channelId,
            );
            return;
        }
        commentsStream.next({ data: comment } as MessageEvent<Comment>);
    }

    private getCacheKey(channelId: string): string {
        return `${this.prefix}_${channelId}`;
    }
}
