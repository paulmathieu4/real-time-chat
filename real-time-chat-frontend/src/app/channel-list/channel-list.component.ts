import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { finalize } from 'rxjs/operators';
import { Channel } from '../channel/channel.model';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss'],
})
export class ChannelListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'actions'];
  dataSource: Channel[] = [];
  isFetchingData = true;
  isAdmin = false;

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authenticationService.isAdmin;
    this.fetchChannels();
  }

  deleteChannel(channelId: string) {
    this.httpClient
      .delete(`${environment.apiBaseUrl}/channel/${channelId}`)
      .subscribe(
        (data) => {
          this.fetchChannels();
        },
        (error) => {
          console.error('Error in deleteChannel: ', error);
        }
      );
  }

  fetchChannels() {
    this.isFetchingData = true;
    this.httpClient
      .get<Channel[]>(`${environment.apiBaseUrl}/channel`)
      .pipe(
        finalize(() => {
          this.isFetchingData = false;
        })
      )
      .subscribe((httpResponse) => {
        this.dataSource = httpResponse;
      });
  }
}
