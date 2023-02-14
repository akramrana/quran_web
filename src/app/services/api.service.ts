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

}
