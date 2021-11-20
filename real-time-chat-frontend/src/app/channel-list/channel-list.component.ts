import { Component, OnInit } from '@angular/core';
import { Channel } from './channel.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss'],
})
export class ChannelListComponent implements OnInit {
  // channels: Channel[] = [
  //   {
  //     geoReferenceId: 1,
  //     orderId: 1,
  //     userId: '1',
  //     _id: '123456789',
  //   },
  //   {
  //     geoReferenceId: 2,
  //     orderId: 2,
  //     userId: '2',
  //     _id: '987654321',
  //   },
  // ];

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
