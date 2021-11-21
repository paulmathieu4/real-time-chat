import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
    getConnectedUserFromHeaders(requestHeaders: any): User {
        const authorizationPayload = JSON.parse(requestHeaders.authorization);
        return {
            id: authorizationPayload?.userId,
            isAdmin: authorizationPayload?.isAdmin === 'true',
            email: 'hardcoded@gmail.com',
        };
    }
}
