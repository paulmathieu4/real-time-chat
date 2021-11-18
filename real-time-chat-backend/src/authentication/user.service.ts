import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
    getConnectedUser(isAdmin: boolean): User {
        return {
            email: 'firstname.lastname@gmail.com',
            id: '1',
            isAdmin: isAdmin,
        };
    }
}
