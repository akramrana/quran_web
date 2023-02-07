import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HadithIndexComponent } from './hadith-index/hadith-index.component';

const routes: Routes = [
  {
    path: '',
    component: HadithIndexComponent,
    children: [
      {
        path: 'index',
        component: HadithIndexComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HadithRoutingModule { }
