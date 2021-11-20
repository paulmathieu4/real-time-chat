import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpsertCommentDto {
    @IsOptional()
    channelId?: string;

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsOptional()
    @IsNumber()
    orderId?: number;

    @IsOptional()
    @IsNumber()
    geoReferenceId?: number;
}

export class GetCommentQueryParams {
    @IsNotEmpty()
    @IsMongoId()
    channelId: string;
}
