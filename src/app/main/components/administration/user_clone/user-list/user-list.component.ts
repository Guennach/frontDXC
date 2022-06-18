import { GlobalConstant } from '../../../../../core/app.constants';
import { from, Observable } from 'rxjs';
import { TranslationService } from 'src/app/shared/services/translationService';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.service';
import { UtilsService } from '../../../../../shared/services/utilsService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../../../../model/User';
import { RoleService } from '../../role/shared/role.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild(NgForm) ngForm!: NgForm;
  isArabNavigation;
  user;
  usersList;
  elementNumber;
  rolesList;
  globalConstant = GlobalConstant;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  tableConfig: any = {
    "componentName":"user",
    "property":["lastname","firstname","email","login","statut","role"]
  }
   

  constructor(private userService: UserService, private confirmationDialogService: ConfirmationDialogService
    , private translationService: TranslationService, private toastr: ToastrService, private utilsService: UtilsService
    , private roleService: RoleService) {
    }

  ngOnInit() {
    this.translationService.translate.onLangChange.subscribe(() => {
      this.isArabNavigation = this.translationService.isCurrentLang(GlobalConstant.LANGUES.ARABE);
      this.setElementNumber();
    });
    this.dtOptions = GlobalConstant.dtOptions;
  

    this.roleService.getAll().subscribe(((roles: any) => {
      this.rolesList = this.utilsService.sort(roles, 'labelFr', GlobalConstant.ORDER.ASC);;
    }));

    this.user = new User();
    this.usersList = new Array<User>();
    this.userService.getAllDeleted().subscribe((data => {
      this.usersList = data;
      this.dtTrigger.next();
      this.setElementNumber();
      console.log(data);
    }));
    

  }

  setElementNumber() {
    this.elementNumber = this.utilsService.getElementNumber(this.usersList);
  }

  getTypesAuthentificationSearching() {
    const result : Boolean[] = [];
    if (this.user.ldap && !this.user.local) {
      result[0] = true;
    } else if (this.user.local && !this.user.ldap) {
      result[0] = false;
    }
    return result;
  }

  getAcivesSearching() {
    const result : Boolean[] = [];
    if (this.user.active && !this.user.desactive) {
      result[0] = true;
    } else if (this.user.desactive && !this.user.active) {
      result[0] = false;
    }
    return result;
  }

  cancel() {
    this.ngForm.reset();
  }

  delete(user) {
    this.confirmationDialogService.confirm(this.translationService.getMessage('GLOBAL.CONFIRMATION')
      , this.translationService.getMessage('GLOBAL.DELETE_MESSAGE') + user.lastName + ' ' + user.firstName + ') ?')
    .then((confirmed) => {
      this.userService.delete(user.id).subscribe(
        res => {
          this.toastr.success(this.translationService.getMessage('GLOBAL.MESSAGE_REGISTRATION_SUCCESS'));
          // Rafraichissement de la liste
          this.usersList = this.usersList.filter(item => item !== user);
          this.setElementNumber();
        },
        (err: any) => {
          this.toastr.error(err.error.message);
        }
      );
    })
    .catch(() => console.log('Non confirmé'));
  }

  update(user) {
    this.confirmationDialogService.confirm(this.translationService.getMessage('GLOBAL.CONFIRMATION')
      , this.translationService.getMessage('GLOBAL.DELETE_MESSAGE') + user.lastName + ' ' + user.firstName + ') ?')
    .then((confirmed) => {
      this.userService.restore(user.id).subscribe(
        res => {
          this.toastr.success(this.translationService.getMessage('GLOBAL.MESSAGE_REGISTRATION_SUCCESS'));
          // Rafraichissement de la liste
          this.usersList = this.usersList.filter(item => item !== user);
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
