import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from '../../../shared/services/translationService';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable()
export class ConfirmationDialogService {

  constructor(private modalService: NgbModal,private translationService: TranslationService) { }

  public confirm(
    title: string,
    message: string,
    btnOkText?: string ,
    btnCancelText?: string ,
    dialogSize: 'sm' | 'lg' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize, backdrop: false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText ? btnOkText : this.translationService.getMessage('GLOBAL.CONFIRM');
    modalRef.componentInstance.btnCancelText = btnCancelText ? btnCancelText : this.translationService.getMessage('GLOBAL.CANCEL');

    return modalRef.result;
  }

}
