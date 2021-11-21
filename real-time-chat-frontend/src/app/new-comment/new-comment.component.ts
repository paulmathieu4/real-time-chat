import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Comment } from '../channel/channel.model';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  geoReferenceId: number;
  orderId: number;
  text: string;
  form: FormGroup;

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.form = this.createEmptyForm();
  }

  postComment() {
    this.httpClient
      .post<Comment>(`${environment.apiBaseUrl}/comment`, this.form.value)
      .subscribe(
        (createdComment: Comment) => {
          this.router.navigate(['channel', createdComment.channelId]);
        },
        (error) => {
          console.error('Error when posting comment: ', error);
        }
      );
  }

  private createEmptyForm(): FormGroup {
    return new FormGroup({
      geoReferenceId: new FormControl(''),
      orderId: new FormControl(''),
      text: new FormControl('', [Validators.required]),
    });
  }
}
