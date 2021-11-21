import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authorizationPayload = {
      userId: this.authenticationService.userId,
      isAdmin: this.authenticationService.isAdmin,
    };
    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        JSON.stringify(authorizationPayload)
      ),
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
