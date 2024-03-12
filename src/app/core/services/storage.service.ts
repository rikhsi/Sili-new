import { Injectable } from '@angular/core';
import { LANGUAGE, STORAGE_KEY, THEME } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  get lang(): LANGUAGE {
    return localStorage.getItem(STORAGE_KEY.lang) as LANGUAGE;
  }

  set lang(activeLang: LANGUAGE) {
    localStorage.setItem(STORAGE_KEY.lang, activeLang);
  }

  get theme(): THEME {
    return localStorage.getItem(STORAGE_KEY.theme) as THEME;
  }

  set theme(activeTheme: THEME) {
    localStorage.setItem(STORAGE_KEY.theme, activeTheme);
  }

  get token(): string {
    return localStorage.getItem(STORAGE_KEY.token);
  }

  set token(accessToken: string) {
    localStorage.setItem(STORAGE_KEY.token, accessToken);
  }

  removeToken(): void {
    localStorage.removeItem(STORAGE_KEY.token);
  }
}
