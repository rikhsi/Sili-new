import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Theme } from 'src/app/constants';
import { DOCUMENT } from '@angular/common';
import { ThemeType } from 'src/app/typings';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  #themeState = new BehaviorSubject<ThemeType>({current: Theme.default});
  themeState$: Observable<ThemeType> = this.#themeState.asObservable();

  get renderer(): Renderer2 {
    return this.rendererF.createRenderer(null,null);
  }

  get documentEl(): HTMLElement {
    return this.document.documentElement;
  }

  get documentHead(): HTMLElement {
    return this.document.head;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererF: RendererFactory2
  ){}

  private getElementByID(theme: Theme): HTMLElement {
    return this.document.getElementById(theme);
  }

  private loadCss(themeState: ThemeType): Observable<ThemeType> {
    return new Observable<ThemeType>(observer => {
      const link = this.renderer.createElement('link');

      link.rel = 'stylesheet';
      link.href = `${themeState.current}.css`;
      link.id = themeState.current;

      link.onload = () => {
        observer.next(themeState);
        observer.complete();
      }

      link.onerror = (error: ErrorEvent) => {
        observer.error(error);
      }

      this.documentHead.appendChild(link);
    });
  }

  private removePrevTheme(theme: Theme): void {
    const prev = this.getElementByID(theme);

    if (prev) {
      this.renderer.removeClass(this.documentEl, theme);
      this.renderer.removeChild(this.documentHead, prev);
    }
  }

  loadTheme(current: Theme, prev: Theme): Observable<ThemeType> {
    this.#themeState.next({ current, prev });

   return this.themeState$
    .pipe(
      switchMap(v => this.loadCss(v)),
      tap(v => {
        if(v.prev) {
          this.removePrevTheme(v.prev)
        }
  
        this.renderer.addClass(this.documentEl, v.current);
      })
    )  
  }
}