import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuranIndexComponent } from './quran-index/quran-index.component';
import { SurahDetailsComponent } from './surah-details/surah-details.component';

const routes: Routes = [
  {
    path: '',
    component: QuranIndexComponent,
    children: [
      {
        path: 'index',
        component: QuranIndexComponent,
      },
    ],
  },
  {
    path: 'surah/:id/:name',
    component: SurahDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuranRoutingModule { }
