import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { ChannelService } from '../channel/channel.service';
import { DatabaseModule } from '../database/database.module';
import { getModelToken } from '@nestjs/mongoose';
import { Comment } from './comment.schema';
import { commentModelMock, mockedComment } from './comment.mock';
import {
    Channel,
    ChannelDocument,
    ChannelSchema,
} from '../channel/channel.schema';
import { channelModelMock } from '../channel/channel.mock';
import { UpsertCommentDto } from './comment-dto.model';

describe('CommentService', () => {
    let service: CommentService;
    let channelService: ChannelService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                CommentService,
                ChannelService,
                {
                    provide: getModelToken(Comment.name),
                    useValue: commentModelMock,
                },
                {
                    provide: getModelToken(Channel.name),
                    useValue: channelModelMock,
                },
            ],
        }).compile();

        service = module.get<CommentService>(CommentService);
        channelService = module.get<ChannelService>(ChannelService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should throw en error if provided channel does not exist', async () => {
            jest.spyOn(channelService, 'exists').mockImplementation(
                async () => {
                    return Promise.resolve(false);
                },
            );
            try {
                await service.create(
                    {
                        channelId: '1',
                        text: 'my text',
                    },
                    'userId',
                );
            } catch (e) {
                expect(e).toEqual(
                    new Error(
                        `The channel ID of the comment does not exist : 1`,
                    ),
                );
            }
        });

        it('should correctly return the created comment when an existing channel is provided', async () => {
            jest.spyOn(channelService, 'exists').mockImplementation(
                async () => {
                    return Promise.resolve(true);
                },
            );
            const commentDtoInput: UpsertCommentDto = {
                channelId: '1',
                text: 'my text',
            };
            expect(await service.create(commentDtoInput, 'userId')).toEqual({
                ...commentDtoInput,
                userId: 'userId',
            });
        });

        it('should correctly return the created comment when no channel id is provided', async () => {
            const commentDtoInput: UpsertCommentDto = {
                text: 'my text',
                geoReferenceId: 20,
            };
            const mockedCreatedChannel: ChannelDocument = {
                userId: 'userId',
                geoReferenceId: 20,
                _id: 'createdChannelUid',
            } as ChannelDocument;
            jest.spyOn(channelService, 'create').mockImplementation(
                async () => {
                    return Promise.resolve(mockedCreatedChannel);
                },
            );
            expect(await service.create(commentDtoInput, 'userId')).toEqual({
                channelId: mockedCreatedChannel._id,
                text: commentDtoInput.text,
                userId: 'userId',
            });
        });
    });
});
