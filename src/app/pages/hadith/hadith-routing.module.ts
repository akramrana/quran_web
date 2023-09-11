import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HadithBookComponent } from './hadith-book/hadith-book.component';
import { HadithIndexComponent } from './hadith-index/hadith-index.component';
import { HadithListComponent } from './hadith-list/hadith-list.component';
import { HadithSearchComponent } from './hadith-search/hadith-search.component';

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
    data:{
      bookName:'bukhari'
    }
  },
  {
    path: 'muslim/:id',
    component: HadithBookComponent,
    data:{
      bookName:'muslim'
    }
  },
  {
    path: 'nasai/:id',
    component: HadithBookComponent,
    data:{
      bookName:'nasai'
    }
  },
  {
    path: 'abudawud/:id',
    component: HadithBookComponent,
    data:{
      bookName:'abudawud'
    }
  },
  {
    path: 'tirmidhi/:id',
    component: HadithBookComponent,
    data:{
      bookName:'tirmidhi'
    }
  },
  {
    path: 'ibnmajah/:id',
    component: HadithBookComponent,
    data:{
      bookName:'ibnmajah'
    }
  },
  {
    path: 'list/:kitabId/:bookId/:name',
    component: HadithListComponent,
  },
  {
    path: 'search',
    component: HadithSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HadithRoutingModule { }
