import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'real-time-chat-frontend';

  constructor(public authenticationService: AuthenticationService) {}

  onUserIdChange(event: any) {
    this.authenticationService.userId = event.target.value;
  }

  onIsAdminChange(event: MatSelectChange) {
    this.authenticationService.isAdmin = event.value === 'true';
  }
}
