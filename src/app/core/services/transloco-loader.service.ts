import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Translation, TranslocoLoader } from "@ngneat/transloco";
import { LANGUAGE } from "src/app/constants";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private http = inject(HttpClient);
    
    getTranslation(lang: LANGUAGE) {
        return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
    }
}