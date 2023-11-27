import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-juz-hizb-rub',
  templateUrl: './juz-hizb-rub.component.html',
  styleUrls: ['./juz-hizb-rub.component.scss']
})
export class JuzHizbRubComponent implements OnInit {

  type: string | null = "";
  typeId: number | string | null = 0;
  ayahList: any[] = [];
  title: string = "";
  wordFileToPlay: string = '';
  wordList: any[] = [];
  ayahText: string = "";
  ayahNum: string = "";
  surahNamecomplex: string = "";
  next: string = "";
  prev: string = "";

  page = 1;
  perPage = 50;
  itShouldLoadMore = true;
  activateScroll = false;

  constructor(
    private apiService: ApiService,
    private _route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      this.type = param['type'];
      this.typeId = param['typeId'];
      if (this.type == "juz") {
        this.title = "Juz'"
      }
      else if (this.type == "hizb") {
        this.title = "Hizb'"
      }
      else if (this.type == "rub") {
        this.title = "Rub'"
      }

      this.titleService.setTitle(this.title + " " + this.typeId);

      this.apiService.getJuzHizbRubDetails({
        type: this.type,
        typeId: this.typeId,
        page: this.page,
        perPage: this.perPage,
      })
        .pipe(first())
        .subscribe(response => {
          const data = response.body.list;
          if (data) {
            this.ayahList = data;
            this.next = response.body.next;
            this.prev = response.body.prev;

            this.activateScroll = true;
          }
        });

    })
  }

  playAyah(row: any) {
    this.ayahText = row.text_indo;
    this.ayahNum = row.ayah_num;
    this.surahNamecomplex = row.name_complex;
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

  copyTextToClipboard(row: any) {
    var text = row.text_indo + "\n" + row.trans + "\n\n" + row.content_en + "\n" + row.content_bn + "\n\n" + row.name_complex + ",Ayah: " + row.ayah_num;
    /*navigator.clipboard.writeText(text).then(() => {
      //console.log('Async: Copying to clipboard was successful!');
      this.toastr.success("Ayah Copied");
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });*/
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
          this.ayahNum = row.ayah_num;
          this.surahNamecomplex = row.name_complex;
          //console.log(this.wordList);
        }
      });
  }

  scroll(id: string) {
    let el = document.getElementById(id) as HTMLElement;
    el.scrollIntoView();
  }

  shareLink(row: any) {
    //let link = environment.webUrl + 'pages/quran/surah/' + row.surah_id + '/' + row.name_slug + ':' + row.ayah_num;
    //let link = environment.webUrl + 'pages/quran/tafsir/' + row.surah_id + '/' + row.ayah_num;
    let link = environment.apiUrl + 'v1/share.php?surah_id=' + row.surah_id + '&ayah_id=' + row.ayah_num;
    /*navigator.clipboard.writeText(link).then(() => {
      //console.log('Async: Copying to clipboard was successful!');
      this.toastr.success("Link Copied to Clipboard!");
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });*/
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
  }

  showTafsir(row: any) {
    this.router.navigate(['/pages/quran/tafsir/' + row.surah_id + '/' + row.ayah_num]);
  }

  prevType() {
    if (this.prev) {
      this.router.navigate(['/pages/quran/juz-hizb-rub/' + this.type + '/' + this.prev]);
    }
  }

  nextType() {
    if (this.next) {
      this.router.navigate(['/pages/quran/juz-hizb-rub/' + this.type + '/' + this.next]);
    }
  }

  goBack() {
    this.router.navigate(['/pages/quran/']);
  }

  onScroll(): void {
    if (this.itShouldLoadMore && this.activateScroll) {
      this.apiService.getJuzHizbRubDetails({
        type: this.type,
        typeId: this.typeId,
        page: ++this.page,
        perPage: this.perPage,
      })
        .pipe(first())
        .subscribe(response => {
          const data: any[] = response.body.list;
          if (data && data.length > 0) {
            this.ayahList = data;
          }else{
            this.itShouldLoadMore =false;
          }
        });
    }
  }

}
