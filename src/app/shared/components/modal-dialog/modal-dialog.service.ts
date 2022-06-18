import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

const defaultModalOptions: NgbModalOptions = {
  size: 'lg',
  backdrop: false
};

@Injectable()
export class ModalDialogService {

  constructor(private modalService: NgbModal) { }

  public open(modalContant, actionClose?, actionDismiss?, options?) {
    const modalOptions = options ? options : defaultModalOptions;
    const modalRef = this.modalService.open(modalContant, modalOptions);
    this.handleResult(modalRef, actionClose, actionDismiss);
    return modalRef;
  }

  public handleResult(modalRef, actionClose, actionDismiss) {
    modalRef.result.then((result) => {
      if (actionClose) {
        actionClose(result);
      }
    }, (reason) => {
      if (actionDismiss) {
        actionDismiss(reason);
      }
    });
  }

}
