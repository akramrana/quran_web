import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-quran-index',
  templateUrl: './quran-index.component.html',
  styleUrls: ['./quran-index.component.scss']
})
export class QuranIndexComponent implements OnInit {

  surahList: any[] = [];

  constructor(
    private domSanitizer: DomSanitizer,
    private apiService: ApiService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Al-Quran');

    this.apiService.getSurahList({})
      .pipe(first())
      .subscribe(response => {
        const data = response.body.list;
        //console.log(data);
        if (data) {
          this.surahList = data;
        }
      });
  }

}
