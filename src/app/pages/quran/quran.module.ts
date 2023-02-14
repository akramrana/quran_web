import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuranRoutingModule } from './quran-routing.module';
import { QuranIndexComponent } from './quran-index/quran-index.component';
import { SurahDetailsComponent } from './surah-details/surah-details.component';
import { AyahTafsirComponent } from './ayah-tafsir/ayah-tafsir.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JuzHizbRubComponent } from './juz-hizb-rub/juz-hizb-rub.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    QuranIndexComponent,
    SurahDetailsComponent,
    AyahTafsirComponent,
    JuzHizbRubComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    QuranRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class QuranModule { }
