import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
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
  formGroup: FormGroup | any;

  selectedBook: any;
  bookList: any[] = [];

  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      bid: ['',Validators.required],
    })
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


      this.apiService.getBookList({
        id: this.kitabId,
      })
        .pipe(first())
        .subscribe(response => {
          const data = response.body.data;
          if (data) {
            this.bookList = data.bookList;
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

  onUp() {

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
        //console.log(this.selectedBook);
        let bid = postParams.bid.reference_book;
        let nameSlug = postParams.bid.name_slug;
        //
        this.router.navigate(['/pages/hadith/list/' + this.kitabId + '/' + bid + '/' + nameSlug]);
      } catch (e) {
        console.log(e);
      }
    }
  }

  copyTextToClipboard(row: any, bookInfo: any) {
    var text = row.text_ar + "\n\n" + row.text_bn + "\n\n" + row.text_en + "\n\n" + bookInfo.kitab_name_en + ": " + row.hadithnumber;
    var textArea = document.createElement("textarea") as HTMLTextAreaElement;
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      this.toastr.success("Hadith Copied");
    } catch (err) {
      console.error('Could not copy text: ', err);
    }
    document.body.removeChild(textArea)
  }

}
