import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Comment } from './channel.model';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit, OnDestroy {
  channelId: string;
  newCommentsSubscription: EventSource;
  date = new Date();
  comments: Comment[];
  isLoadingComments = true;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.channelId = params['id'];
      this.getComments(this.channelId);
      this.subscribeToNewComments(this.channelId);
    });
  }

  ngOnDestroy() {
    this.newCommentsSubscription.close();
  }

  messages: any[] = [];

  sendMessage(event: any) {
    console.log('send message event: ', event);

    this.httpClient
      .post(`${environment.apiBaseUrl}/comment`, {
        channelId: this.channelId,
        text: event.message,
      })
      .subscribe(
        (data) => {},
        (err) => {
          console.error(err);
        }
      );
  }

  private subscribeToNewComments(channelId: string) {
    if (this.newCommentsSubscription) {
      this.newCommentsSubscription.close();
    }

    this.newCommentsSubscription = new EventSource(
      `${environment.apiBaseUrl}/comment/stream?channelId=${channelId}`
    );
    this.newCommentsSubscription.onmessage = (message: MessageEvent) => {
      this.comments.push(JSON.parse(message.data));
    };
    this.newCommentsSubscription.onerror = (error) => {
      console.error(error);
    };
  }

  private getComments(channelId: string) {
    this.httpClient
      .get<Comment[]>(
        `${environment.apiBaseUrl}/comment?channelId=${channelId}`
      )
      .pipe(
        finalize(() => {
          this.isLoadingComments = false;
        })
      )
      .subscribe(
        (data) => {
          this.comments = data;
        },
        (error) => {
          console.error('Error when getting comments: ', error);
        }
      );
  }
}
