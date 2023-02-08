import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuranRoutingModule } from './quran-routing.module';
import { QuranIndexComponent } from './quran-index/quran-index.component';
import { SurahDetailsComponent } from './surah-details/surah-details.component';
import { AngMusicPlayerModule } from 'ang-music-player';


@NgModule({
  declarations: [
    QuranIndexComponent,
    SurahDetailsComponent
  ],
  imports: [
    CommonModule,
    QuranRoutingModule
  ]
})
export class QuranModule { }
