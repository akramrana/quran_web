import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HadithRoutingModule } from './hadith-routing.module';
import { HadithIndexComponent } from './hadith-index/hadith-index.component';
import { HadithBookComponent } from './hadith-book/hadith-book.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HadithListComponent } from './hadith-list/hadith-list.component';


@NgModule({
  declarations: [
    HadithIndexComponent,
    HadithBookComponent,
    HadithListComponent
  ],
  imports: [
    CommonModule,
    HadithRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ]
})
export class HadithModule { }
