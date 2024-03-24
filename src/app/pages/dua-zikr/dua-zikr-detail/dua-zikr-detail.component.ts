import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-dua-zikr-detail',
  templateUrl: './dua-zikr-detail.component.html',
  styleUrls: ['./dua-zikr-detail.component.scss']
})
export class DuaZikrDetailComponent implements OnInit {

  duaList: any[] = [];
  name: string | null = "";

  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private router: Router,
    private _route: ActivatedRoute,
    private metaTagService: Meta,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      this.name = param['name'];
      this.titleService.setTitle(this.capitalizeFirstLetter(param['name']));
      this.apiService.getDuaList({
        q: param['name'],
      })
        .pipe(first())
        .subscribe(response => {
          const data = response.body.list;
          //console.log(data);
          if (data) {
            this.duaList = data;
            this.metaTagService.updateTag({
              name: 'keywords',
              content: param['name']
            });
            this.metaTagService.updateTag({
              name: 'description',
              content: param['name']
            });
            this.metaTagService.updateTag({
              property: "og:title",
              content: param['name']
            })
            this.metaTagService.updateTag({
              property: "og:description",
              content: param['name']
            })
            this.metaTagService.updateTag({
              property: "og:url",
              content: "http://quran.codxplore.com/pages/dua-zikr/" + param['name']
            })
          }
        });
    })
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  copyTextToClipboard(row: any) {
    var text = row.name_en + ": " + row.name_bn + "\n\n" + row.arabic + "\n\n" + row.transliteration_en + "\n\n" + row.transliteration_bn + "\n\n" + row.translations_en + "\n\n" + row.translations_bn + "\n\n" + "Reference:" + "\n" + row.reference_en + "\n" + row.reference_bn;
    var textArea = document.createElement("textarea") as HTMLTextAreaElement;
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      this.toastr.success("Dua Copied");
    } catch (err) {
      console.error('Could not copy text: ', err);
    }
    document.body.removeChild(textArea)
  }

}
