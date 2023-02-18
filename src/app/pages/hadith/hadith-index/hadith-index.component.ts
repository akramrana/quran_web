import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hadith-index',
  templateUrl: './hadith-index.component.html',
  styleUrls: ['./hadith-index.component.scss']
})
export class HadithIndexComponent implements OnInit {

  kitabList: any = [
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
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
