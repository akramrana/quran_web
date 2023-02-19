import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HadithBookComponent } from './hadith-book/hadith-book.component';
import { HadithIndexComponent } from './hadith-index/hadith-index.component';
import { HadithListComponent } from './hadith-list/hadith-list.component';

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
  },
  {
    path: 'bukhari/:id',
    component: HadithBookComponent,
  },
  {
    path: 'muslim/:id',
    component: HadithBookComponent,
  },
  {
    path: 'nasai/:id',
    component: HadithBookComponent,
  },
  {
    path: 'abudawud/:id',
    component: HadithBookComponent,
  },
  {
    path: 'abudawud/:id',
    component: HadithBookComponent,
  },
  {
    path: 'tirmidhi/:id',
    component: HadithBookComponent,
  },
  {
    path: 'ibnmajah/:id',
    component: HadithBookComponent,
  },
  {
    path: 'list/:kitabId/:bookId/:name',
    component: HadithListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HadithRoutingModule { }
