import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchIndexComponent } from './watch-index/watch-index.component';

const routes: Routes = [
  {
    path: '',
    component: WatchIndexComponent,
    children: [
      {
        path: 'index',
        component: WatchIndexComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchRoutingModule { }
