import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

export const disableAuthMetadataKey = 'disableAuthorization';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isAuthenticationDeactivatedForEndpoint =
            this.reflector.get<boolean>(
                disableAuthMetadataKey,
                context.getHandler(),
            );
        if (isAuthenticationDeactivatedForEndpoint) {
            return true;
        }
        const requestHeaders = context.switchToHttp().getRequest()['headers'];
        if (!requestHeaders['authorization']) {
            return false;
        }
        const reqAuthorizationPayload = JSON.parse(
            requestHeaders['authorization'],
        );
        console.log('reqAuthorizationPayload: ', reqAuthorizationPayload);

        if (!reqAuthorizationPayload.userId) {
            return false;
        }

        return true;
    }
}
