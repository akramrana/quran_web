import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ayah-tafsir',
  templateUrl: './ayah-tafsir.component.html',
  styleUrls: ['./ayah-tafsir.component.scss']
})
export class AyahTafsirComponent implements OnInit {

  surahId: number | string | null = 0;
  ayahId: number | string | null = 0;
  tafsir: any = {};
  @Input() fileToPlay: string = '';
  showPlayer: boolean = false;

  constructor(
    private domSanitizer: DomSanitizer,
    private apiService: ApiService,
    private titleService: Title,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this._route.params.subscribe((param) => {
      this.surahId = param['surahId'];
      this.ayahId = param['ayahId'];

      this.apiService.getTafsir({
        surah_id: this.surahId,
        ayah_id: this.ayahId,
      })
        .pipe(first())
        .subscribe(response => {
          const data = response.body.data;
          if (data) {
            this.tafsir = data;

            this.titleService.setTitle(this.tafsir.name_complex+":"+this.ayahId);
          }
        });
    })
  }

  goBack() {
    this.router.navigate(['/pages/quran/surah/' + this.tafsir.surah_id + '/' + this.tafsir.name_slug + ':' + this.ayahId]);
  }

  prevAyah() {
    this.router.navigate(['/pages/quran/tafsir/' + this.tafsir.surah_id + '/' + this.tafsir.prev_ayah]);
  }

  nextAyah() {
    this.router.navigate(['/pages/quran/tafsir/' + this.tafsir.surah_id + '/' + this.tafsir.next_ayah]);
  }

}
