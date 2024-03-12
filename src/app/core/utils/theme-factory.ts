import { Observable, take } from "rxjs";
import { StorageService, ThemeService } from "../services";
import { ThemeType } from "src/app/typings";
import { THEME } from "src/app/constants";

export function themeFactory(
    themeService: ThemeService, 
    storageService: StorageService
  ): () => Observable<ThemeType> {
    const storageTheme = storageService.theme ?? THEME.dark;
  
    return () => themeService.loadTheme(
      storageTheme, 
      null
    ).pipe(take(1));
}