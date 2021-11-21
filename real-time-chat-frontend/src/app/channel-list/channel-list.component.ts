import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { finalize } from 'rxjs/operators';
import { Channel } from '../channel/channel.model';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss'],
})
export class ChannelListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'actions'];
  dataSource: Channel[] = [];
  isFetchingData = true;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
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
