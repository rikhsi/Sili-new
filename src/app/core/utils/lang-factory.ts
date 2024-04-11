import { LANGUAGE } from "src/app/constants";
import { LanguageService, StorageService } from "../services";
import { Observable } from "rxjs";

export function langFactory(
    langService: LanguageService, 
    storageService: StorageService
  ): () => Observable<string> {
    const lang = storageService.lang ?? LANGUAGE.ru;
  
    return () => langService.onChangeLang$(lang);
  }