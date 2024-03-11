import { Language } from "src/app/constants";
import { LanguageService, StorageService } from "../services";
import { Observable, take } from "rxjs";

export function langFactory(
    langService: LanguageService, 
    storageService: StorageService
  ): () => Observable<Language> {
    const lang = storageService.lang ?? Language.ru;
  
    langService.onChangeLang(lang);
  
    return () => langService.currentLang$.pipe(take(1));
  }