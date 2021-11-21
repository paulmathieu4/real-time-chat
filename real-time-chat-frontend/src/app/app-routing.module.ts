import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ChannelComponent } from './channel/channel.component';
import { NewCommentComponent } from './new-comment/new-comment.component';

const routes: Routes = [
  { path: '', component: ChannelListComponent },
  { path: 'channel/:id', component: ChannelComponent },
  { path: 'new-comment', component: NewCommentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
