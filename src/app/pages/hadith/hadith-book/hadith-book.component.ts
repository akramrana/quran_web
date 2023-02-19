import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-hadith-book',
  templateUrl: './hadith-book.component.html',
  styleUrls: ['./hadith-book.component.scss']
})
export class HadithBookComponent implements OnInit {

  bookDetails: any = {};
  bookList: any[] = [];

  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Hadith');
    this._route.params.subscribe((param) => {
      this.apiService.getBookList({
        id: param['id'],
      })
        .pipe(first())
        .subscribe(response => {
          const data = response.body.data;
          //console.log(data);
          if (data) {
            this.bookDetails = data.bookDetails;
            this.bookList = data.bookList;
            this.titleService.setTitle(this.bookDetails.name_en);
          }
        });
    })
  }

}
