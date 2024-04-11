import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { PRIMARY_COLOR, THEME } from 'src/app/constants';
import { DOCUMENT } from '@angular/common';
import { ThemeType } from 'src/app/typings';
import { StorageService } from './storage.service';
import { MetaService } from './meta.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  #currentTheme = new BehaviorSubject<ThemeType>(null);

  get currentTheme$(): Observable<ThemeType> {
    return this.#currentTheme.asObservable();
  }

  get primaryColor$(): Observable<string> {
    return this.currentTheme$.pipe(
      map(state => (
        PRIMARY_COLOR[state.current]
      ))
    );  
  }

  get theme(): ThemeType {
    return this.#currentTheme.getValue();
  }

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
    private rendererF: RendererFactory2,
    private storageService: StorageService,
    private metaService: MetaService
  ){}

  loadTheme$(
    current: THEME, 
    prev: THEME
  ): Observable<ThemeType> {
    this.#currentTheme.next({current, prev});
  
    return this.loadCss$({current, prev})
      .pipe(
        first(),
        tap(theme => {
          if (theme.prev) {
            this.removePrevTheme(theme.prev);
          }
  
          this.renderer.addClass(
            this.documentEl, 
            theme.current
          );
          this.metaService.updateWorkerColor(
            theme.current
          );

          this.storageService.theme = theme.current;
        })
      );
  }

  private getElementByID(theme: THEME): HTMLElement {
    return this.document.getElementById(theme);
  }

  private loadCss$(themeState: ThemeType): Observable<ThemeType> {
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

  private removePrevTheme(theme: THEME): void {
    const prev = this.getElementByID(theme);

    if (prev) {
      this.renderer.removeClass(
        this.documentEl, 
        theme
      );
      
      this.renderer.removeChild(
        this.documentHead, 
        prev
      );
    }
  }
}