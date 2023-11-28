import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  formGroup: FormGroup | any;
  ayahList: any[] = [];
  surahList: any[] = [];
  selectedSurah: any;

  constructor(
    private domSanitizer: DomSanitizer,
    private apiService: ApiService,
    private titleService: Title,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      surahId: [''],
      ayahId: [''],
    })

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
            this.titleService.setTitle(this.tafsir.name_complex + ":" + this.ayahId);
            this.showPlayer = true;
            this.cdr.detectChanges();
            var audio = document.getElementById('audio') as HTMLAudioElement;
            var source = document.getElementById('audioSource') as HTMLSourceElement;
            source.src = this.tafsir.audio_url;
            audio.load();
          }
        });
    });

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

  goBack() {
    this.router.navigate(['/pages/quran/surah/' + this.tafsir.surah_id + '/' + this.tafsir.name_slug + ':' + this.ayahId]);
  }

  prevAyah() {
    this.router.navigate(['/pages/quran/tafsir/' + this.tafsir.surah_id + '/' + this.tafsir.prev_ayah]);
  }

  nextAyah() {
    this.router.navigate(['/pages/quran/tafsir/' + this.tafsir.surah_id + '/' + this.tafsir.next_ayah]);
  }

  setAyah() {
    this.ayahList = [];
    this.formGroup.patchValue({
      ayahId: ""
    });
    if (this.selectedSurah) {
      let totalAyah = Number(this.selectedSurah.ayat);
      for (let i = 1; i <= totalAyah; i++) {
        let d = {
          value: i,
          name: i,
        }
        this.ayahList.push(d);
      }
    }
  }

  search() {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.formGroup.valid) {
      try {
        const postParams = this.formGroup.value;
        //console.log(postParams.surahId);
        if (postParams.surahId && postParams.surahId.surah_id && postParams.ayahId && postParams.ayahId.value) {
          let surah_id = postParams.surahId.surah_id;
          let ayah_num = postParams.ayahId.value;
          //
          this.router.navigate(['/pages/quran/tafsir/' + surah_id + '/' + ayah_num]);
        }
        else {
          this.toastr.warning("Please select surah and ayah");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

}
