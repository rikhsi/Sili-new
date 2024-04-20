import { Observable } from "rxjs";
import { THEME } from "src/app/constants";
import { ThemeType } from "src/app/typings";

import { StorageService, ThemeService } from "../services";

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