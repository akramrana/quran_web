import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuaZikrIndexComponent } from './dua-zikr-index/dua-zikr-index.component';
import { DuaZikrDetailComponent } from './dua-zikr-detail/dua-zikr-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DuaZikrIndexComponent,
    children: [
      {
        path: 'index',
        component: DuaZikrIndexComponent,
      },
    ],
  },
  {
    path: ':name',
    component: DuaZikrDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuaZikrRoutingModule { }
