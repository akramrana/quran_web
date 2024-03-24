import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuaZikrRoutingModule } from './dua-zikr-routing.module';
import { DuaZikrIndexComponent } from './dua-zikr-index/dua-zikr-index.component';
import { DuaZikrDetailComponent } from './dua-zikr-detail/dua-zikr-detail.component';


@NgModule({
  declarations: [
    DuaZikrIndexComponent,
    DuaZikrDetailComponent
  ],
  imports: [
    CommonModule,
    DuaZikrRoutingModule
  ]
})
export class DuaZikrModule { }
