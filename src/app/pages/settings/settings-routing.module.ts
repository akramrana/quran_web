import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsIndexComponent } from './settings-index/settings-index.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsIndexComponent,
    children: [
      {
        path: 'index',
        component: SettingsIndexComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
