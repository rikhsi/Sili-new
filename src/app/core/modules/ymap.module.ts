import { NgModule } from '@angular/core';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

@NgModule({
  imports: [
    AngularYandexMapsModule.forRoot({
      apikey: 'd306c0df-8591-4784-ae3e-23323936fbd4',
      lang: 'ru_RU'
    })
  ]
})
export class YmapModule { }
