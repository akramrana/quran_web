import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferencesRoutingModule } from './references-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    ReferencesRoutingModule
  ]
})
export class ReferencesModule { }
