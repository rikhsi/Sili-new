import { Observable } from "rxjs";
import { LANGUAGE } from "src/app/constants";

import { LanguageService, StorageService } from "../services";

export function langFactory(
    langService: LanguageService, 
    storageService: StorageService
  ): () => Observable<string> {
    const lang = storageService.lang ?? LANGUAGE.ru;
  
    return () => langService.onChangeLang$(lang, false);
  }