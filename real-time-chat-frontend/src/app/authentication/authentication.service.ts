import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAdmin = false;
  userId = 'userid';

  constructor() {}
}
