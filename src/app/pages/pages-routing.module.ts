import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'quran',
        pathMatch: 'full',
      },
      {
        path: 'quran',
        loadChildren: () => import('./quran/quran.module')
          .then(m => m.QuranModule),
      },
      {
        path: 'hadith',
        loadChildren: () => import('./hadith/hadith.module')
          .then(m => m.HadithModule),
      },
      {
        path: 'watch',
        loadChildren: () => import('./watch/watch.module')
          .then(m => m.WatchModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module')
          .then(m => m.SettingsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
