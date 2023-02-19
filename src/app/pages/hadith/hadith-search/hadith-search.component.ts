import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-hadith-search',
  templateUrl: './hadith-search.component.html',
  styleUrls: ['./hadith-search.component.scss']
})
export class HadithSearchComponent implements OnInit {

  q: string = "";
  formGroup: FormGroup | any;
  page = 1;
  perPage = 20;
  itShouldLoadMore = true;
  activateScroll = false;
  hadithList: any[] = [];
  id: number | string | null = 0;

  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      q: ['', Validators.required],
    })

    this.titleService.setTitle("Search");
    this._route.queryParams.subscribe(params => {
      this.q = params['q'];
      this.id = params['id'];
      this.formGroup.patchValue({
        q: this.q
      })

      this.apiService.searchHadith({
        q: this.q,
        kitab_id: this.id,
        page: this.page,
        perPage: this.perPage,
      }).pipe(first())
        .subscribe(response => {
          const data: any = response.body.data;
          if (data) {
            this.hadithList = data.hadithList;
            this.activateScroll = true;
          }
        });
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

  onScroll(): void {
    if (this.itShouldLoadMore && this.activateScroll) {
      console.log("scrolled down!!");
      this.apiService.searchHadith({
        q: this.q,
        kitab_id: this.id,
        page: ++this.page,
        perPage: this.perPage,
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

}
