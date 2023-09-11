import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
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
  id: number | string | null = 0;

  formGroup: FormGroup | any;

  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    let bookName = (this._route.snapshot.data['bookName']) ? this._route.snapshot.data['bookName'] : '';
    this.formGroup = this.fb.group({
      q: ['', Validators.required],
    })
    this.titleService.setTitle('Hadith');
    this._route.params.subscribe((param) => {
      this.id = param['id'];
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

            this.metaTagService.updateTag({
              name: 'keywords',
              content: this.bookDetails.name_en
            });
            this.metaTagService.updateTag({
              name: 'description',
              content: this.bookDetails.name_en + ", " + this.bookDetails.name_bn + ", " + this.bookDetails.name_ar
            });
            this.metaTagService.updateTag({
              property: "og:title",
              content: this.bookDetails.name_en
            })
            this.metaTagService.updateTag({
              property: "og:description",
              content: this.bookDetails.name_en + ", " + this.bookDetails.name_bn + ", " + this.bookDetails.name_ar
            })
            this.metaTagService.updateTag({
              property: "og:url",
              content: "http://quran.codxplore.com/pages/hadith/"+bookName+"/"+this.id
            })
          }
        });
    })
  }

  search() {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.formGroup.valid) {
      try {
        const postParams = this.formGroup.value;
        let q = postParams.q;
        //
        this.router.navigate(['/pages/hadith/search'], {
          queryParams: {
            id: this.id,
            q: q,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

}
