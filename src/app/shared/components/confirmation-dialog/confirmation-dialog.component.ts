import { GlobalConstant } from './../../../core/app.constants';
import { TranslationService } from 'src/app/shared/services/translationService';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  isArabNavigation;
  @Input() title!: string;
  @Input() message!: string;
  @Input() btnOkText!: string;
  @Input() btnCancelText!: string;

  constructor(private activeModal: NgbActiveModal, private translationService: TranslationService) { }

  ngOnInit() {
    this.isArabNavigation = this.translationService.isCurrentLang(GlobalConstant.LANGUES.ARABE);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
