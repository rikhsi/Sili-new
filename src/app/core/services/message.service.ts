import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR_MESSAGE, INFO_MESSAGE, SUCCESS_MESSAGE } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private msg: NzMessageService, 
    private translocoService: TranslocoService
  ) {}

  onNotifySuccess(msg: SUCCESS_MESSAGE): void {
    const text = this.translocoService.translate(msg);

    this.msg.success(text);
  }

  onNotifyInfo(msg: INFO_MESSAGE): void {
    const text = this.translocoService.translate(msg);

    this.msg.info(text);
  }

  onNotifyError(msg: ERROR_MESSAGE): void {
    const text = this.translocoService.translate(msg);
    
    this.msg.error(text);
  }
}