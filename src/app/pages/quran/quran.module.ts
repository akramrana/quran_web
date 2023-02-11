import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuranRoutingModule } from './quran-routing.module';
import { QuranIndexComponent } from './quran-index/quran-index.component';
import { SurahDetailsComponent } from './surah-details/surah-details.component';
import { AyahTafsirComponent } from './ayah-tafsir/ayah-tafsir.component';


@NgModule({
  declarations: [
    QuranIndexComponent,
    SurahDetailsComponent,
    AyahTafsirComponent
  ],
  imports: [
    CommonModule,
    QuranRoutingModule
  ]
})
export class QuranModule { }
