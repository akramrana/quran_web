import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dua-zikr-index',
  templateUrl: './dua-zikr-index.component.html',
  styleUrls: ['./dua-zikr-index.component.scss']
})
export class DuaZikrIndexComponent implements OnInit {

  tagList: any[] = [];

  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Dua and Zikr');
    this.apiService.getDuaTagList({})
      .pipe(first())
      .subscribe(response => {
        const data = response.body.list;
        //console.log(data);
        if (data) {
          let tagList: any[] = [];
          for (let dt of data) {
            let d = {
              id: dt.id,
              tagSlug: dt.tag_slug,
              tagEn: dt.tag_en,
              tagBn: dt.tag_bn,
            }
            tagList.push(d);
          }
          this.tagList = tagList;
        }
      });

    this.metaTagService.updateTag({
      name: 'keywords',
      content: "Dua, Zikr, Dhikr"
    });
    this.metaTagService.updateTag({
      name: 'description',
      content: "Dua and Zikr, দোয়া জিকির, دعاء وأذكار"
    });
    this.metaTagService.updateTag({
      property: "og:title",
      content: "Dua and Zikr"
    })
    this.metaTagService.updateTag({
      property: "og:description",
      content: "Dua and Zikr, দোয়া জিকির, دعاء وأذكار"
    })
    this.metaTagService.updateTag({
      property: "og:url",
      content: "http://quran.codxplore.com/pages/duz-zikr"
    })
  }

}
