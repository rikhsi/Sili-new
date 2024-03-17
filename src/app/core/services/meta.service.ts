import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { map, tap } from 'rxjs';
import { LANGUAGE, THEME_COLOR, THEME } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private meta: Meta,
    private title: Title,
    private translocoService: TranslocoService
  ) { }

  updateTitle(): void {
    this.translocoService.selectTranslate('title')
    .pipe(
      map( title => `Sili - ${title}`),
      tap( title => this.title.setTitle(title))
    ).subscribe();
  }

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
