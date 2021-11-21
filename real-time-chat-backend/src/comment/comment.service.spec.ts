import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { ChannelService } from '../channel/channel.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comment } from './comment.schema';
import { commentModelMock } from './comment.mock';
import { Channel, ChannelDocument } from '../channel/channel.schema';
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

            // spy on Date to prevent date differences when comparing "new Date()" values in unit tests
            const dateSpy = jest.spyOn(global, 'Date');

            const commentDtoInput: UpsertCommentDto = {
                channelId: '1',
                text: 'my text',
            };
            expect(await service.create(commentDtoInput, 'userId')).toEqual({
                ...commentDtoInput,
                userId: 'userId',
                date: dateSpy.mock.instances[0], // get what the new Date returned inside service.create
            });
        });

        it(
            'should correctly return the created comment when no channel' +
                ' id is provided and if no channel exist for the trifecta',
            async () => {
                const commentDtoInput: UpsertCommentDto = {
                    text: 'my text',
                    geoReferenceId: 20,
                };
                const mockedCreatedChannel: ChannelDocument = {
                    userId: 'userId',
                    geoReferenceId: 20,
                    _id: 'createdChannelUid',
                } as ChannelDocument;

                // spy on Date to prevent date differences when comparing "new Date()" values in unit tests
                const dateSpy = jest.spyOn(global, 'Date');
                jest.spyOn(channelService, 'findOne').mockImplementation(
                    async () => {
                        return Promise.resolve(null);
                    },
                );
                jest.spyOn(channelService, 'create').mockImplementation(
                    async () => {
                        return Promise.resolve(mockedCreatedChannel);
                    },
                );
                expect(await service.create(commentDtoInput, 'userId')).toEqual(
                    {
                        channelId: mockedCreatedChannel._id,
                        text: commentDtoInput.text,
                        userId: 'userId',
                        date: dateSpy.mock.instances[0], // get what the new Date returned inside service.create
                    },
                );
            },
        );

        it(
            'should correctly return the created comment when no channel' +
                ' id is provided and if a channel already exists for the trifecta',
            async () => {
                const commentDtoInput: UpsertCommentDto = {
                    text: 'my text',
                    geoReferenceId: 20,
                };
                const mockedExistingChannel: ChannelDocument = {
                    userId: 'userId',
                    geoReferenceId: 20,
                    _id: 'createdChannelUid',
                } as ChannelDocument;

                // spy on Date to prevent date differences when comparing "new Date()" values in unit tests
                const dateSpy = jest.spyOn(global, 'Date');
                jest.spyOn(channelService, 'findOne').mockImplementation(
                    async () => {
                        return Promise.resolve(mockedExistingChannel);
                    },
                );
                expect(await service.create(commentDtoInput, 'userId')).toEqual(
                    {
                        channelId: mockedExistingChannel._id,
                        text: commentDtoInput.text,
                        userId: 'userId',
                        date: dateSpy.mock.instances[0], // get what the new Date returned inside service.create
                    },
                );
            },
        );
    });
});
