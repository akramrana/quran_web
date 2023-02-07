import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchRoutingModule } from './watch-routing.module';
import { WatchIndexComponent } from './watch-index/watch-index.component';


@NgModule({
  declarations: [
    WatchIndexComponent
  ],
  imports: [
    CommonModule,
    WatchRoutingModule
  ]
})
export class WatchModule { }
