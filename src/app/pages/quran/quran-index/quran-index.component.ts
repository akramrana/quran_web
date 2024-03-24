import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
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
  tagList: any[] = [];

  isSurahList = true;
  isJuzList = false;
  isHizbList = false;
  isRubList = false;

  formGroup: FormGroup | any;

  kitabList: any[] = [];

  searchSurah = new FormControl('', [Validators.minLength(2)]);
  searchParams: any = {};

  /*kitabList: any = [
    {
      id: 5,
      nameEn: "Sahih al-Bukhari",
      nameBn: "সহীহ আল-বুখারী",
      nameAr: "صحيح البخاري",
      nameSlug: "bukhari"
    },
    {
      id: 6,
      nameEn: "Sahih Muslim",
      nameBn: "সহীহ মুসলিম",
      nameAr: "صحيح مسلم",
      nameSlug: "muslim"
    },
    {
      id: 1,
      nameEn: "Sunan an-Nasa'i",
      nameBn: "সুনানে নাসাঈ",
      nameAr: "سنن النسائي",
      nameSlug: "nasai"
    },
    {
      id: 2,
      nameEn: "Sunan Abi Dawud",
      nameBn: "সুনানে আবু দাউদ",
      nameAr: "سنن أبي داود",
      nameSlug: "abudawud"
    },
    {
      id: 4,
      nameEn: "Jami` at-Tirmidhi",
      nameBn: "জামিউত তিরমিজী",
      nameAr: "جامع الترمذي ",
      nameSlug: "tirmidhi"
    },
    {
      id: 3,
      nameEn: "Sunan Ibn Majah",
      nameBn: "সুনানে ইবনে মাজাহ",
      nameAr: "سنن ابن ماجه",
      nameSlug: "ibnmajah"
    },
  ];*/

  appList: any[] = [
    {
      id: 1,
      name: "Quran Tafsir English Bangla",
      url: "https://play.google.com/store/apps/details?id=com.akramhossain.quranulkarim&hl=en&gl=US",
      img: "https://play-lh.googleusercontent.com/Zr-PWf-iRVCCCjx7PpqUCrIKT7EkxJ_jVCg_9s6OyLZavBsQlQCkRIU4E8xCJpE51Q=w240-h480"
    },
    {
      id: 2,
      name: "Sahih al-Bukhari (সহীহ বুখারী)",
      url: "https://play.google.com/store/apps/details?id=com.akramhossin.bukharisharif&hl=en&gl=US",
      img: "https://play-lh.googleusercontent.com/0fiVEvTZAFdvkAhhPWK7Npr1NOj0r1X5NIuR0kPHftl2ceIMGcJuXZPkF2boH2upMoU=w240-h480"
    },
    {
      id: 3,
      name: "Sahih Muslim (সহীহ মুসলিম)",
      url: "https://play.google.com/store/apps/details?id=com.akramhossin.sahihmuslim&hl=en&gl=US",
      img: "https://play-lh.googleusercontent.com/Q4LcZPKumFRYj8EDKAvY6wchqi-TvNC4Kmaiez7ZxjaSevJc8H9dqI86cxnQ9LOef3Y=w240-h480"
    },
    {
      id: 4,
      name: "Sunan and Tirmidhi",
      url: "https://play.google.com/store/apps/details?id=com.akramhossin.nasaiabudawudibnmajahtirmidhi&hl=en&gl=US",
      img: "https://play-lh.googleusercontent.com/vhxTyhbYtAi_Fj_pwiCmjYKkW3zwUntNNaNzL00bQQzbLstehaMEnaeYbGPXfXiioFS1=w240-h480"
    },
    {
      id: 5,
      name: "Islamic Video",
      url: "https://play.google.com/store/apps/details?id=com.akramhossain.islamicvideo&hl=en&gl=US",
      img: "https://play-lh.googleusercontent.com/8Hz73nssIzVBwOfI5U5frPs4zAjTEsmgOFiAhJAzijyb8kIHW80WNC0r4rGhz1OQrA=w240-h480"
    },
  ];

  constructor(
    private domSanitizer: DomSanitizer,
    private apiService: ApiService,
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      q: ['', Validators.required],
    })

    this.titleService.setTitle('Al-Quran');

    this.apiService.getHadithBookList({})
      .pipe(first())
      .subscribe(response => {
        const data = response.body.data;
        //console.log(data);
        if (data) {
          let bookList: any[] = [];
          for (let dt of data) {
            let d = {
              id: dt.id,
              nameEn: dt.name_en,
              nameBn: dt.name_bn,
              nameAr: dt.name_ar,
              nameSlug: dt.name_slug
            }
            bookList.push(d);
          }
          this.kitabList = bookList;
        }
      });

    this.apiService.getSurahList({})
      .pipe(first())
      .subscribe(response => {
        const data = response.body.list;
        //console.log(data);
        if (data) {
          this.surahList = data;
        }

        const tags = response.body.tags;
        if (tags) {
          this.tagList = tags;
        }
      });

    const recentlyReadList = this.getRecentlyOpenItems();
    this.recentlyOpenList = recentlyReadList;

    const recentlySearchList = this.getRecentlySearchItems();
    this.recentlySearchList = recentlySearchList;

    this.searchSurah.valueChanges.pipe(debounceTime(500)).subscribe((searchValue: string) => {
      if (!this.searchSurah.invalid) {
        this.searchParams = {
          q: searchValue,
        }
        this.apiService.getSurahList(this.searchParams)
          .pipe(first())
          .subscribe(response => {
            const data = response.body.list;
            //console.log(data);
            this.surahList = [];
            if (data) {
              this.surahList = data;
            }
          });
      }
    });

    this.metaTagService.updateTag({
      name: 'keywords',
      content: "Al-Quran, The Holy Quran"
    });
    this.metaTagService.updateTag({
      name: 'description',
      content: "Quran, Al-Quran Al-Kareem, Al-Ketab, Al-Furqan, Al-Maw'itha, Al-Thikr, and Al-Noor"
    });
    this.metaTagService.updateTag({
      property: "og:title",
      content: "Al-Quran, The Holy Quran"
    })
    this.metaTagService.updateTag({
      property: "og:description",
      content: "Quran, Al-Quran Al-Kareem, Al-Ketab, Al-Furqan, Al-Maw'itha, Al-Thikr, and Al-Noor"
    })
    this.metaTagService.updateTag({
      property: "og:url",
      content: "http://quran.codxplore.com"
    })

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
