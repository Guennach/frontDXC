import { Router, ActivatedRoute } from '@angular/router';
import { GlobalConstant } from './../../../../../core/app.constants';
import { UtilsService } from './../../../../../shared/services/utilsService';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/shared/services/translationService';
import { ConfirmationDialogService } from './../../../../../shared/components/confirmation-dialog/confirmation-dialog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingService } from '../shared/setting.service';
import { Setting } from 'src/app/main/model/setting';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  @ViewChild('all') all;
  isArabNavigation;
  setting;
  elementNumber;
  detail= false;
  globalConstant = GlobalConstant;

  constructor(private settingService: SettingService, private confirmationDialogService: ConfirmationDialogService
    , private translationService: TranslationService, private toastr: ToastrService, private utilsService: UtilsService
    , private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {

    this.setting = new Setting();

    this.translationService.translate.onLangChange.subscribe(() => {
      this.isArabNavigation = this.translationService.isCurrentLang(GlobalConstant.LANGUES.ARABE);
    });

    if(this.router.url.startsWith("/settings/detail")) {
      this.detail = true;
    }
    
    this.route.params.subscribe(params => {
      
        this.settingService.get(params['id']).subscribe((setting => {
          this.setting = setting;
        }));
      
    });

  }

  save() {
    
    this.settingService.save(this.setting).subscribe(
      res => {
        this.toastr.success(this.translationService.getMessage('GLOBAL.MESSAGE_REGISTRATION_SUCCESS'));
        this.returnToListPage();
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  cancel() {
    this.confirmationDialogService.confirm(this.translationService.getMessage('GLOBAL.CONFIRMATION')
      , this.translationService.getMessage('GLOBAL.MESSAGE_ANNULATION'))
      .then((confirmed) => {
        this.returnToListPage();
      })
      .catch(() => console.log('Anuulé'));
  }

  returnToListPage() {
    this.router.navigate([`/settings`]);
  }


}
