import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

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
  ayahNum: string = "";

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
          if (name && name.includes(":")) {
            let nameArr = name.split(":");
            //console.log(nameArr);
            if (nameArr[1]) {
              this.scroll("target" + nameArr[1]);
            }
          }

          let isExistingSura = false;
          const recentlyReadList = this.getRecentlyOpenItems();
          if (recentlyReadList && recentlyReadList.length > 0) {
            for (let row of recentlyReadList) {
              if (row.surah_id === this.data.sura.surah_id) {
                isExistingSura = true;
              }
            }
          }
          if (!isExistingSura) {
            recentlyReadList.push({
              surah_id: this.data.sura.surah_id,
              name_slug: this.data.sura.name_slug,
              name_complex: this.data.sura.name_complex,
              name_english: this.data.sura.name_english,
              revelation_place: this.data.sura.revelation_place,
              revelation_order: this.data.sura.revelation_order,
              name_arabic: this.data.sura.name_arabic,
              name_bangla: this.data.sura.name_bangla,
              ayat: this.data.sura.ayat,
            });

            this.updateRecentList(recentlyReadList);
          }
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

  getRecentlyOpenItems(): any[] {
    const recentlyReads = localStorage.getItem('recently_read');
    if (recentlyReads) {
      return JSON.parse(recentlyReads) as any[];
    }
    return [];
  }

  updateRecentList(suraList: any[]) {
    localStorage.setItem('recently_read', JSON.stringify(suraList));
  }

  playAyah(row: any) {
    this.ayahText = row.text_tashkeel;
    this.ayahNum = row.ayah_num
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
      //console.log('Async: Copying to clipboard was successful!');
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
          this.ayahNum = row.ayah_num
          //console.log(this.wordList);
        }
      });
  }

  scroll(id: string) {
    let el = document.getElementById(id) as HTMLElement;
    el.scrollIntoView();
  }

  shareLink(sura: any, row: any) {
    let link = environment.webUrl + 'pages/quran/surah/' + sura.surah_id + '/' + sura.name_slug + ':' + row.ayah_num;
    navigator.clipboard.writeText(link).then(() => {
      //console.log('Async: Copying to clipboard was successful!');
      this.toastr.success("Link Copied to clipboard!");
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
}
