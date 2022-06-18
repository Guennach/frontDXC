import { GlobalConstant } from './../../../../../core/app.constants';
import { TranslationService } from 'src/app/shared/services/translationService';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from './../../../../../shared/components/confirmation-dialog/confirmation-dialog.service';
import { UtilsService } from './../../../../../shared/services/utilsService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { SettingService } from '../shared/setting.service';
import { Setting } from 'src/app/main/model/setting';

@Component({
  selector: 'app-setting-list',
  templateUrl: './setting-list.component.html',
  styleUrls: ['./setting-list.component.css']
})
export class SettingListComponent implements OnInit {

  @ViewChild(NgForm) ngForm!: NgForm;
  isArabNavigation;
  setting;
  settingList;
  elementNumber;
  globalConstant = GlobalConstant;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  tableConfig: any = {
    "componentName":"settings",
    "property":["label","type","value"]
  }
   

  constructor(private confirmationDialogService: ConfirmationDialogService
    , private translationService: TranslationService, private toastr: ToastrService, private utilsService: UtilsService, 
    private settingService: SettingService ) {
    }

  ngOnInit() {
    this.translationService.translate.onLangChange.subscribe(() => {
      this.isArabNavigation = this.translationService.isCurrentLang(GlobalConstant.LANGUES.ARABE);
      this.setElementNumber();
    });
    this.dtOptions = GlobalConstant.dtOptions;

    this.setting = new Setting();
    this.settingList = new Array<Setting>();
    this.settingService.getAll().subscribe((data => {
      this.settingList = data;
      this.dtTrigger.next();
      this.setElementNumber();
    }));
  }

  setElementNumber() {
    this.elementNumber = this.utilsService.getElementNumber(this.settingList);
  }

 

  cancel() {
    this.ngForm.reset();
  }

  delete(setting) {
    this.confirmationDialogService.confirm(this.translationService.getMessage('GLOBAL.CONFIRMATION')
      , this.translationService.getMessage('GLOBAL.DELETE_MESSAGE') + setting.label + ' ' + setting.value + ') ?')
    .then((confirmed) => {
      this.settingService.delete(setting.id).subscribe(
        res => {
          this.toastr.success(this.translationService.getMessage('GLOBAL.MESSAGE_REGISTRATION_SUCCESS'));
          // Rafraichissement de la liste
          this.settingList = this.settingList.filter(item => item !== setting);
          this.setElementNumber();
        },
        (err: any) => {
          this.toastr.error(err.error.message);
        }
      );
    })
    .catch(() => console.log('Non confirmé'));
  }

}
