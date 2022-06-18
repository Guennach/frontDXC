import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from '../../role/shared/role.service';
import { GlobalConstant } from '../../../../../core/app.constants';
import { UtilsService } from '../../../../../shared/services/utilsService';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/shared/services/translationService';
import { ConfirmationDialogService } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../../../../model/User';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('all') all;
  isArabNavigation;
  user;
  rolesList;
  elementNumber;
  globalConstant = GlobalConstant;

  constructor(private userService: UserService, private confirmationDialogService: ConfirmationDialogService
    , private translationService: TranslationService, private toastr: ToastrService, private utilsService: UtilsService
    , private roleService: RoleService, private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {

    this.user = new User();

    this.translationService.translate.onLangChange.subscribe(() => {
      this.isArabNavigation = this.translationService.isCurrentLang(GlobalConstant.LANGUES.ARABE);
    });

    this.roleService.getAll().subscribe(((roles: any) => {
      this.rolesList = this.utilsService.sort(roles, 'labelFr', GlobalConstant.ORDER.ASC);
    }));

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userService.get(params['id']).subscribe((user => {
          this.user = user;
        }));
      }
    });

  }

  save() {
    this.user.pwd = this.user.nouveauMotPasse;
    this.user.lastNamebreAuthentificationEchoue = 0;
    this.user.deleted = 0; // ana li zedtha
    this.userService.save(this.user).subscribe(
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
    this.router.navigate([`/users`]);
  }

  checkPassWordValidity() {
    if (this.user.typeAuthentificationLdap) {
      return true;
    }
    if (this.user.id) {
      if (!this.user.nouveauMotPasse && !this.user.confirmationMotPasse) {
        return true;
      }
      if (!this.user.nouveauMotPasse || !this.user.confirmationMotPasse) {
        return false;
      } else {
        return this.user.nouveauMotPasse === this.user.confirmationMotPasse;
      }
    }
    else if (!this.user.id) {
      if (!this.user.nouveauMotPasse || !this.user.confirmationMotPasse) {
        return false;
      } else {
        return this.user.nouveauMotPasse === this.user.confirmationMotPasse;
      }
    }
    return true;
  }

  compareEntites(selectedEntite, optionEntite): boolean {
    return selectedEntite && optionEntite ? selectedEntite.id === optionEntite.id : false;
  }

  compareRoles(selectedRole, optionRole): boolean {
    return selectedRole && optionRole ? selectedRole.id === optionRole.id : false ;
  }

}
