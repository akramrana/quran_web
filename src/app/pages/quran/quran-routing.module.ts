import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyahTafsirComponent } from './ayah-tafsir/ayah-tafsir.component';
import { JuzHizbRubComponent } from './juz-hizb-rub/juz-hizb-rub.component';
import { QuranIndexComponent } from './quran-index/quran-index.component';
import { SearchComponent } from './search/search.component';
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
  {
    path: 'tafsir/:surahId/:ayahId',
    component: AyahTafsirComponent,
  },
  {
    path: 'juz-hizb-rub/:type/:typeId',
    component: JuzHizbRubComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuranRoutingModule { }
