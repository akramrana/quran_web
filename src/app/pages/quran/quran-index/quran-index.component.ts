import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  recentlySearchList: any[] = [];

  isSurahList = true;
  isJuzList = false;
  isHizbList = false;
  isRubList = false;

  formGroup: FormGroup | any;

  constructor(
    private domSanitizer: DomSanitizer,
    private apiService: ApiService,
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      q: ['', Validators.required],
    })

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

    const recentlySearchList = this.getRecentlySearchItems();
    this.recentlySearchList = recentlySearchList;

  }

  getRecentlySearchItems(): any[] {
    const recentlySearch = localStorage.getItem('recently_search');
    if (recentlySearch) {
      return JSON.parse(recentlySearch) as any[];
    }
    return [];
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

  search() {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.formGroup.valid) {
      try {
        const postParams = this.formGroup.value;
        //console.log(postParams);
        let q = postParams.q;
        //
        this.router.navigate(['/pages/quran/search'], {
          queryParams: { 
            q: q
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
}
