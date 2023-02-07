import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HadithRoutingModule } from './hadith-routing.module';
import { HadithIndexComponent } from './hadith-index/hadith-index.component';


@NgModule({
  declarations: [
    HadithIndexComponent
  ],
  imports: [
    CommonModule,
    HadithRoutingModule
  ]
})
export class HadithModule { }
