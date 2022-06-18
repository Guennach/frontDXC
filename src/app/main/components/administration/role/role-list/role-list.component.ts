import { Component, OnInit } from '@angular/core';
import { GlobalConstant } from 'src/app/core/app.constants';
import { RoleService } from '../shared/role.service';
import { Role } from 'src/app/main/model/Role';
import { TranslationService } from 'src/app/shared/services/translationService';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { UtilsService } from 'src/app/shared/services/utilsService';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  rolesList;
  elementNumber;
  globalConstant = GlobalConstant;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  tableConfig: any = {
    "componentName":"role",
    "property":["label","acces"]
  }
  constructor(private roleService: RoleService, private confirmationDialogService: ConfirmationDialogService
    , private translate: TranslationService, private toastr: ToastrService, private utilsService: UtilsService) {
     }

  ngOnInit() {
   
    this.rolesList = new Array<Role>();
    this.roleService.getAll().subscribe((data => {
      this.rolesList = data;
      this.dtTrigger.next();
      this.setElementNumber();
    }));
    this.dtOptions = GlobalConstant.dtOptions;
    
  }

  setElementNumber() {
    this.elementNumber = this.utilsService.getElementNumber(this.rolesList);
  }

  delete(role) {
    
    this.confirmationDialogService.confirm(this.translate.getMessage('GLOBAL.CONFIRMATION')
      , this.translate.getMessage('GLOBAL.DELETE_MESSAGE') + role.label + ') ?')
    .then((confirmed) => {
      this.roleService.delete(role.id).subscribe(
        res => {
          this.toastr.success(this.translate.getMessage('GLOBAL.MESSAGE_REGISTRATION_SUCCESS'));
          // Rafraichissement de la liste
          this.rolesList = this.rolesList.filter(item => item !== role);
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
