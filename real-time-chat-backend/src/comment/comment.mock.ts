import { Comment } from './comment.schema';

export const mockedComment: Comment = {
    text: 'comment text',
    channelId: '1',
    userId: 'userId',
    date: new Date(),
};

export class commentModelMock {
    constructor(private data) {}
    save = jest.fn().mockResolvedValue(this.data);
    static find = jest.fn().mockResolvedValue([mockedComment]);
    static findOne = jest.fn().mockResolvedValue(mockedComment);
    static findOneAndUpdate = jest.fn().mockResolvedValue(mockedComment);
    static deleteOne = jest.fn().mockResolvedValue(true);
}
