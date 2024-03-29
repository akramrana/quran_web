import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { DomSanitizer, Title, Meta } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  ayahBn: string = "";
  ayahNum: string = "";
  tafsir: any = {};
  selectedSurah: any;
  ayahList: any[] = [];
  formGroup: FormGroup | any;

  surahAyahList: any[] = [];

  page = 1;
  perPage = 50;
  itShouldLoadMore = true;
  activateScroll = false;

  reading: any = [];

  showTranslation: boolean = true;
  showReading: boolean = false;

  constructor(
    private domSanitizer: DomSanitizer,
    private apiService: ApiService,
    private titleService: Title,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      surahId: [''],
      ayahId: [''],
      //q: [''],
    })

    if (this.fileToPlay != '') {
      this.showPlayer = true;
    }

    this._route.params.subscribe((param) => {
      //console.log(param);
      this.id = param['id'];
      let name = param['name'];

      if (name && name.includes(":")) {
        let nameArr = name.split(":");
        //console.log(nameArr);
        if (nameArr[1]) {
          if (nameArr[1] > this.perPage) {
            if (nameArr[1] > 50 && nameArr[1] < 100) {
              this.perPage = 100;
            }
            else if (nameArr[1] >= 100 && nameArr[1] < 150) {
              this.perPage = 150;
            }
            else if (nameArr[1] >= 150 && nameArr[1] < 200) {
              this.perPage = 200;
            }
            else if (nameArr[1] >= 200 && nameArr[1] < 250) {
              this.perPage = 250;
            }
            else if (nameArr[1] >= 250) {
              this.perPage = 300;
            }
          }
        }
      }

      this.apiService.getSurahDetails({
        surah_id: this.id,
        page: this.page,
        perPage: this.perPage,
        suraInfo: 1
      })
        .pipe(first())
        .subscribe(response => {
          const data = response.body.data;
          //console.log(data);
          if (data) {
            this.data = data;
            this.surahAyahList = this.data.ayah;
            this.titleService.setTitle(this.data.sura?.name_complex);
            this.fileToPlay = "https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/" + this.data.sura.surah_id + ".mp3";
            //
            this.showPlayer = true;
            //console.log(this.fileToPlay);
            this.cdr.detectChanges();
            var audio = document.getElementById('surahAudio') as HTMLAudioElement;
            var source = document.getElementById('surahAudioSource') as HTMLSourceElement;
            source.src = this.fileToPlay;
            audio.load();
            //
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
              recentlyReadList.unshift({
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

            this.activateScroll = true;

            this.reading = this.data.reading;

            this.metaTagService.updateTag({
              name: 'keywords',
              content: this.data.sura.name_complex
            });
            this.metaTagService.updateTag({
              name: 'description',
              content: this.data.sura.name_complex + ',' + this.data.sura.name_bangla + ',' + this.data.sura.name_arabic
            });
            this.metaTagService.updateTag({
              property: "og:title",
              content: this.data.sura.name_complex
            })
            this.metaTagService.updateTag({
              property: "og:description",
              content: this.data.sura.name_complex + ',' + this.data.sura.name_bangla + ',' + this.data.sura.name_arabic
            })
            this.metaTagService.updateTag({
              property: "og:url",
              content: "http://quran.codxplore.com/pages/quran/surah/" + this.data.sura.surah_id + "/" + this.data.sura.name_slug
            })
          }
        });
    })

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
    this.ayahText = row.text_indo;
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
    var text = row.text_indo + "\n" + row.trans + "\n\n" + row.content_en + "\n" + row.content_bn + "\n\n" + sura.name_complex + ",Ayah: " + row.ayah_num;
    var textArea = document.createElement("textarea") as HTMLTextAreaElement;
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      this.toastr.success("Ayah Copied");
    } catch (err) {
      console.error('Could not copy text: ', err);
    }
    document.body.removeChild(textArea)
    /*navigator.clipboard.writeText(text).then(() => {
      //console.log('Async: Copying to clipboard was successful!');
      this.toastr.success("Ayah Copied");
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });*/
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
          this.ayahText = row.text_indo;
          this.ayahNum = row.ayah_num
          //console.log(this.wordList);
        }
      });
  }

  scroll(id: string) {
    if (this.showTranslation) {
      let el = document.getElementById(id) as HTMLElement;
      el.scrollIntoView();
    }
  }

  shareLink(sura: any, row: any) {
    //let link = environment.webUrl + 'pages/quran/surah/' + sura.surah_id + '/' + sura.name_slug + ':' + row.ayah_num;
    //let link = environment.webUrl + 'pages/quran/tafsir/' + row.surah_id + '/' + row.ayah_num;
    let link = environment.apiUrl + 'v1/share.php?surah_id=' + row.surah_id + '&ayah_id=' + row.ayah_num;
    var textArea = document.createElement("textarea") as HTMLTextAreaElement;
    textArea.value = link;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      this.toastr.success("Link Copied to Clipboard");
    } catch (err) {
      console.error('Could not copy link: ', err);
    }
    document.body.removeChild(textArea)
    /*navigator.clipboard.writeText(link).then(() => {
      //console.log('Async: Copying to clipboard was successful!');
      this.toastr.success("Link Copied to Clipboard!");
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });*/
  }

  showTafsir(row: any) {
    this.router.navigate(['/pages/quran/tafsir/' + row.surah_id + '/' + row.ayah_num]);

  }

  setAyah() {
    //console.log(this.selectedSurah);
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
    //console.log(this.ayahList);
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
        let surah_id = postParams.surahId.surah_id;
        let name_slug = postParams.surahId.name_slug;
        let ayah_num = (postParams.ayahId) ? ':' + postParams.ayahId.value : "";
        //
        this.router.navigate(['/pages/quran/surah/' + surah_id + '/' + name_slug + ayah_num]);
      } catch (e) {
        console.log(e);
      }
    }
  }

  onScroll(): void {
    if (this.itShouldLoadMore && this.activateScroll) {
      console.log("scrolled down!!");
      this.apiService.getSurahDetails({
        surah_id: this.id,
        page: ++this.page,
        perPage: this.perPage,
        suraInfo: 0
      })
        .pipe(first())
        .subscribe(response => {
          const res: any = response.body.data;
          //console.log(data);
          if (res) {
            const data: any[] = res.ayah;
            if (data && data.length > 0) {
              this.surahAyahList.push(...data);
            } else {
              this.itShouldLoadMore = false;
            }
          }
        });
    }
  }

  onUp() {

  }

  showTranslationBlock() {
    this.showReading = false;
    this.showTranslation = true;
  }

  showReadingBlock() {
    this.showReading = true;
    this.showTranslation = false;
  }

}
