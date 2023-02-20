import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-hadith-list',
  templateUrl: './hadith-list.component.html',
  styleUrls: ['./hadith-list.component.scss']
})
export class HadithListComponent implements OnInit {

  bookInfo: any = {};
  hadithList: any[] = [];

  page = 1;
  perPage = 20;
  itShouldLoadMore = true;
  activateScroll = false;

  kitabId: number | string | null = 0;
  bookId: number | string | null = 0;

  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      this.kitabId = param['kitabId'];
      this.bookId = param['bookId'];
      //
      this.apiService.getHadithList({
        kitab_id: param['kitabId'],
        book_id: param['bookId'],
        bookInfo: 1,
        page: this.page,
        perPage: this.perPage,
      })
        .pipe(first())
        .subscribe(response => {
          const data = response.body.data;
          //console.log(data);
          if (data) {
            this.bookInfo = data.bookInfo;
            this.hadithList = data.hadithList;
            this.titleService.setTitle(this.bookInfo.name_en);

            this.activateScroll = true;
          }
        });
    })
  }

  onScroll(): void {
    if (this.itShouldLoadMore && this.activateScroll) {
      console.log("scrolled down!!");
      this.apiService.getHadithList({
        kitab_id: this.kitabId,
        book_id: this.bookId,
        page: ++this.page,
        perPage: this.perPage,
        bookInfo: 0
      })
        .pipe(first())
        .subscribe(response => {
          const res: any = response.body.data;
          if (res) {
            const data: any[] = res.hadithList;
            if (data && data.length > 0) {
              this.hadithList.push(...data);
            } else {
              this.itShouldLoadMore = false;
            }
          }
        });
    }
  }

  onUp(){

  }

}
