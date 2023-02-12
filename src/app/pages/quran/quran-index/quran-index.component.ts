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
  juzList: any[] = [];
  hizbList: any[] = [];
  rubList: any[] = [];
  recentlyOpenList: any[] = [];

  isSurahList = true;
  isJuzList = false;
  isHizbList = false;
  isRubList = false;

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

    const recentlyReadList = this.getRecentlyOpenItems();
    this.recentlyOpenList = recentlyReadList;

  }

  getRecentlyOpenItems(): any[] {
    const recentlyReads = localStorage.getItem('recently_read');
    if (recentlyReads) {
      return JSON.parse(recentlyReads) as any[];
    }
    return [];
  }

  getJuzHizbRub(type: string) {
    this.isSurahList = false;
    if (type == "juz") {
      this.isRubList = false;
      this.isHizbList = false;
      this.isJuzList = true;
    }
    if (type == "hizb") {
      this.isRubList = false;
      this.isHizbList = true;
      this.isJuzList = false;
    }
    if (type == "rub") {
      this.isRubList = true;
      this.isHizbList = false;
      this.isJuzList = false;
    }

    this.apiService.getJuzHizbRubList({
      type: type
    })
      .pipe(first())
      .subscribe(response => {
        const data = response.body.list;
        //console.log(data);
        if (data) {
          if (type == "juz") {
            this.juzList = data;
          }
          if (type == "hizb") {
            this.hizbList = data;
          }
          if (type == "rub") {
            this.rubList = data;
          }
        }
      });
  }

  getHome() {
    this.isSurahList = true;
    this.isJuzList = false;
    this.isHizbList = false;
    this.isRubList = false;

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
