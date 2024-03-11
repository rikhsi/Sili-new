import { Injectable } from '@angular/core';
import { Language, StorageKey, Theme } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  get lang(): Language {
    return localStorage.getItem(StorageKey.lang) as Language;
  }

  set lang(activeLang: Language) {
    localStorage.setItem(StorageKey.lang, activeLang);
  }

  get theme(): Theme {
    return localStorage.getItem(StorageKey.theme) as Theme;
  }

  set theme(activeTheme: Theme) {
    localStorage.setItem(StorageKey.theme, activeTheme);
  }

  get token(): string {
    return localStorage.getItem(StorageKey.token);
  }

  set token(accessToken: string) {
    localStorage.setItem(StorageKey.token, accessToken);
  }
}
