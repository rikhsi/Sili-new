import { en_US, ru_RU } from "ng-zorro-antd/i18n";
import { LocaleType } from "../typings";

export enum Language {
    uz = 'uz',
    ru = 'ru',
    en = 'en'
}

export const LANGUAGE_LOCALE: { [key in Language]: LocaleType } = {
    uz: ru_RU,
    ru: ru_RU,
    en: en_US
}