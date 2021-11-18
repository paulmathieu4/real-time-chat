import { Channel } from './channel.schema';

export const mockedChannel: Channel = {
    geoReferenceId: 1,
    orderId: 2,
    userId: '3',
};

export class channelModelMock {
    constructor(private data) {}
    save = jest.fn().mockResolvedValue(this.data);
    static find = jest.fn().mockResolvedValue([mockedChannel]);
    static findOne = jest.fn().mockResolvedValue(mockedChannel);
    static findOneAndUpdate = jest.fn().mockResolvedValue(mockedChannel);
    static deleteOne = jest.fn().mockResolvedValue(true);
}
