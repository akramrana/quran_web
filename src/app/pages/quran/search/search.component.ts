import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  q: string = "";
  formGroup: FormGroup | any;
  ayahList: any[] = [];
  wordFileToPlay: string = '';
  wordList: any[] = [];
  ayahText: string = "";
  ayahNum: string = "";
  surahNamecomplex: string = "";

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
      q: ['',Validators.required],
    })
    this.titleService.setTitle("Search");
    this._route.queryParams.subscribe(params => {
      this.q = params['q'];
      this.formGroup.patchValue({
        q:this.q
      })

      this.apiService.search({
        q: this.q,
      }).pipe(first())
        .subscribe(response => {
          const data = response.body.list;
          if (data) {
            this.ayahList = data;
          }
        });
    });
  }

  playAyah(row: any) {
    this.ayahText = row.text_tashkeel;
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
    var text = row.text_tashkeel + "\n" + row.trans + "\n\n" + row.content_en + "\n" + row.content_bn + "\n\n" + row.name_complex + ",Ayah: " + row.ayah_num;
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
          this.ayahText = row.text_tashkeel;
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
    let link = environment.webUrl + 'pages/quran/tafsir/' + row.surah_id + '/' + row.ayah_num;
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

  search() {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.formGroup.valid) {
      try {
        const postParams = this.formGroup.value;
        //console.log(postParams);
        let q = postParams.q;
        //
        this.router.navigate(['/pages/quran/search'], {
          queryParams: { 
            q: q
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

}
