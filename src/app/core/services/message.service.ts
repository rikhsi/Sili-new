import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ErrorMessage, InfoMessage, SuccessMessage } from 'src/app/constants';



@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private msg: NzMessageService, 
    private translocoService: TranslocoService
  ) {}

  onNotifySuccess(msg: SuccessMessage): void {
    const text = this.translocoService.translate(msg);

    this.msg.success(text);
  }

  onNotifyInfo(msg: InfoMessage): void {
    const text = this.translocoService.translate(msg);

    this.msg.info(text);
  }

  onNotifyError(msg: ErrorMessage): void {
    const text = this.translocoService.translate(msg);

    this.msg.error(text);
  }
}