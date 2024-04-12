import { Observable } from "rxjs";
import { StorageService, ThemeService } from "../services";
import { ThemeType } from "src/app/typings";
import { THEME } from "src/app/constants";

export function themeFactory(
    themeService: ThemeService, 
    storageService: StorageService
  ): () => Observable<ThemeType> {
    const storageTheme = storageService.theme ?? THEME.default;
  
    return () => themeService.loadTheme$(
      storageTheme,
      false
    );
}