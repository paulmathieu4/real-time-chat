import { IsMongoId } from 'class-validator';

export class DeleteChannelParams {
    @IsMongoId()
    id: string;
}

export class GetChannelCommentsParams {
    @IsMongoId()
    id: string;
}
