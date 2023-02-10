import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  @Input() wordFileToPlay: string = '';
  showPlayer: boolean = false;
  audio: any;
  wordList: any[] = [];
  ayahText: string = "";

  constructor(
    private domSanitizer: DomSanitizer,
    private apiService: ApiService,
    private titleService: Title,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    if (this.fileToPlay != '') {
      this.showPlayer = true;
    }

    this.id = this._route.snapshot.paramMap.get('id');
    let name = this._route.snapshot.paramMap.get('name');
    console.log(name);

    this.apiService.getSurahDetails({
      surah_id: this.id
    })
      .pipe(first())
      .subscribe(response => {
        const data = response.body.data;
        //console.log(data);
        if (data) {
          this.data = data;
          this.titleService.setTitle(this.data.sura?.name_complex);
          this.fileToPlay = "https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/" + this.data.sura.surah_id + ".mp3";
          this.cdr.detectChanges();
          this.showPlayer = true;
          this.scroll("target6")
          this.toastr.success('Hello world!', 'Toastr fun!');
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

  playAyah(row: any) {
    this.ayahText = row.text_tashkeel;
    this.wordFileToPlay = row.audio_url;
    this.cdr.detectChanges();

    var audio = document.getElementById('audio') as HTMLAudioElement;

    var source = document.getElementById('audioSource') as HTMLSourceElement;
    source.src = row.audio_url;
    audio.load();
  }

  playWord(row: any) {
    let audio = new Audio(row.mp3Url);
    audio.play()
  }

  copyTextToClipboard(row: any, sura: any) {
    var text = row.text_tashkeel + "\n" + row.trans + "\n\n" + row.content_en + "\n" + row.content_bn + "\n\n" + sura.name_complex + ",Ayah: " + row.ayah_num;
    navigator.clipboard.writeText(text).then(() => {
      console.log('Async: Copying to clipboard was successful!');
      this.toastr.success("Ayah Copied");
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  wordMeaning(row: any) {
    this.apiService.getWordList({
      ayah_key: row.ayah_key
    })
      .pipe(first())
      .subscribe(response => {
        const data = response.body.data;
        //console.log(data);
        this.wordList = [];
        if (data) {
          this.wordList = data;
          this.ayahText = row.text_tashkeel;
          //console.log(this.wordList);
        }
      });
  }

  scroll(id: string) {
    let el = document.getElementById(id) as HTMLElement;
    el.scrollIntoView();
  }
}
