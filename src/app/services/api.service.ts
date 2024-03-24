import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseRoute = 'v1';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getSurahList(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/home.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  getSurahDetails(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/surah-details.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  getWordList(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/word-meaning.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  getTafsir(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/tafsir.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  getJuzHizbRubList(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/juz-hizb-rub.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  getJuzHizbRubDetails(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/juz-hizb-rub-details.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  search(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/search.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  getBookList(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/book.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }
  
  getHadithList(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/hadith-list.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  searchHadith(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/search-hadith.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  getHadithBookList(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/book-list.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  getDuaTagList(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/dua-zikr-tags.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  getDuaList(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/dua-zikr-list.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

}
