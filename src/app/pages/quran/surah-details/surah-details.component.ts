import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-surah-details',
  templateUrl: './surah-details.component.html',
  styleUrls: ['./surah-details.component.scss']
})
export class SurahDetailsComponent implements OnInit {

  data: any = {};
  id: number | string | null = 0;
  surahList: any[] = [];
  @Input() fileToPlay: string = '';

  showPlayer: boolean = false;

  audio: any;

  constructor(
    private domSanitizer: DomSanitizer,
    private apiService: ApiService,
    private titleService: Title,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    if (this.fileToPlay != '') {
      this.showPlayer = true;
    }

    this.id = this._route.snapshot.paramMap.get('id');

    this.apiService.getSurahDetails({
      surah_id: this.id
    })
      .pipe(first())
      .subscribe(response => {
        const data = response.body.data;
        //console.log(data);
        if (data) {
          this.data = data;
          this.fileToPlay = "https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/" + this.data.sura.surah_id + ".mp3";
          this.cdr.detectChanges();
          this.showPlayer = true;
        }
      });

    /*this.apiService.getSurahList({})
      .pipe(first())
      .subscribe(response => {
        const data = response.body.list;
        //console.log(data);
        if (data) {
          this.surahList = data;
        }
      });*/
  }

  playAudio(audio_url: string) {

  }

  copyTextToClipboard(row: any, sura: any) {
    var text = row.text_tashkeel + "\n" + row.trans + "\n\n" + row.content_en + "\n" + row.content_bn + "\n\n"+sura.name_complex+",Ayah: " + row.ayah_num;
    navigator.clipboard.writeText(text).then(function () {
      console.log('Async: Copying to clipboard was successful!');
      alert("Ayah Copied")
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

}
