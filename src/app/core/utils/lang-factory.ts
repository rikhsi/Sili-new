import { LANGUAGE } from "src/app/constants";
import { LanguageService, StorageService } from "../services";
import { EMPTY, Observable } from "rxjs";

export function langFactory(
    langService: LanguageService, 
    storageService: StorageService
  ): () => Observable<LANGUAGE> {
    const lang = storageService.lang ?? LANGUAGE.ru;
  
    langService.onChangeLang(lang);
  
    return () => EMPTY;
  }