import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-hadith-index',
  templateUrl: './hadith-index.component.html',
  styleUrls: ['./hadith-index.component.scss']
})
export class HadithIndexComponent implements OnInit {

  kitabList: any[] = [];
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
  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private metaTagService: Meta
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('The Hadith of the Prophet Muhammad PBUH');
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

    this.metaTagService.updateTag({
      name: 'keywords',
      content: "Hadith, Prophet Muhammad PBUH"
    });
    this.metaTagService.updateTag({
      name: 'description',
      content: "The Hadith of the Prophet Muhammad PBUH, মুহাম্মদ সা:-এর হাদিস সমূহ, حديث النبي محمد صلى الله عليه وسلم"
    });
    this.metaTagService.updateTag({
      property: "og:title",
      content: "The Hadith of the Prophet Muhammad PBUH"
    })
    this.metaTagService.updateTag({
      property: "og:description",
      content: "The Hadith of the Prophet Muhammad PBUH, মুহাম্মদ সা:-এর হাদিস সমূহ, حديث النبي محمد صلى الله عليه وسلم"
    })
    this.metaTagService.updateTag({
      property: "og:url",
      content: "http://quran.codxplore.com/pages/hadith"
    })
  }

}
