import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { first, Observable, tap } from 'rxjs';
import { LANGUAGE, PRIMARY_COLOR, THEME } from 'src/app/constants';

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

  updateTitle$(): Observable<string> {
    const key = 'auth.layout_description';

    return this.translocoService.selectTranslate(key)
    .pipe(
      first(),
      tap( title => this.title.setTitle(
        `Sili - ${title}`
      )),
      tap(title => this.meta.updateTag({
        name: 'description', 
        content: title
      }))
    );
  }

  updateWorkerColor(theme: THEME): void {
    this.meta.updateTag({ 
      name: 'theme-color', 
      content: PRIMARY_COLOR[theme] 
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
