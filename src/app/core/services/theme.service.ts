import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, EMPTY, from, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, tap, toArray, withLatestFrom } from 'rxjs/operators';
import { ERROR_MESSAGE, PRIMARY_COLOR, SUCCESS_MESSAGE, THEME } from 'src/app/constants';
import { ThemeItem, ThemeType } from 'src/app/typings';

import { MessageService } from './message.service';
import { MetaService } from './meta.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  #currentTheme = new BehaviorSubject<ThemeType>(null);

  get currentTheme$(): Observable<ThemeType> {
    return this.#currentTheme.asObservable();
  }

  get themeList$(): Observable<ThemeItem[]> {
    return this.currentTheme$.pipe(
      map(themeState => themeState.current),
      withLatestFrom(
        of(Object.values(THEME))
      ),
      switchMap(([
        currentTheme, 
        themeList
      ]) => (
        from(themeList).pipe(
          map(theme => ({
            theme,
            name: `theme.${theme}`,
            isSelected: currentTheme === theme
          })),
          toArray()
        )
      ))
    );
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
    private metaService: MetaService,
    private messageService: MessageService
  ){}

  loadTheme$(
    current: THEME,
    isMessage: boolean = true
  ): Observable<ThemeType> {
    const prev = this.theme?.current;
  
    return this.loadCss$({current, prev})
      .pipe(
        first(),
        tap(theme => {
          this.themeChangeSuccess(theme,isMessage);
        }),
        catchError(() => (
          this.themeChangeError$()
        ))
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

  private themeChangeSuccess(theme: ThemeType, isMessage: boolean): void {
    if (theme?.prev) {
      this.removePrevTheme(theme.prev);
    }

    this.renderer.addClass(
      this.documentEl, 
      theme.current
    );

    this.metaService.updateWorkerColor(
      theme.current
    );

    this.#currentTheme.next(theme);

    this.storageService.theme = theme.current;

    if(isMessage) {
      this.messageService.onNotifySuccess(
        SUCCESS_MESSAGE.theme
      );
    }
  }

  private themeChangeError$(): Observable<never> {
    this.messageService.onNotifyError(
      ERROR_MESSAGE.theme
    );

    return EMPTY;
  }
}