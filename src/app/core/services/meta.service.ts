import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { take, tap } from 'rxjs';
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
    const key = 'auth.layout_description';

    this.translocoService.selectTranslate(key)
    .pipe(
      tap( title => this.title.setTitle(`Sili - ${title}`)),
      tap(title => this.meta.updateTag({
        name: 'description', 
        content: title
      })),
      take(1)
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
