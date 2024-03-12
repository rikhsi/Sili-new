import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { LANGUAGE, THEME_COLOR, THEME } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private meta: Meta
  ) { }

  updateWorkerColor(theme: THEME): void {
    this.meta.updateTag({ 
      name: 'theme-color', 
      content: THEME_COLOR[theme] 
    });
  }

  updateLocale(lang: LANGUAGE): void {
    this.meta.updateTag({ 
      name: 'locale', 
      content: lang 
    });

    this.meta.updateTag({ 
      'http-equiv': 'Content-Language', 
      content: lang 
    });
    
    this.document.documentElement.lang = lang;
  }
}
