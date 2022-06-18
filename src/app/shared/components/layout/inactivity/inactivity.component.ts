import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConstant } from '../../../../core/app.constants';
import { TranslationService } from '../../../services/translationService';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-inactivity',
  templateUrl: './inactivity.component.html',
  styleUrls: ['./inactivity.component.scss']
})
export class InactivityComponent implements OnInit {
  isArabNavigation;
   count: any = GlobalConstant.INACTIVITY_TIMER.COUNTDOWN_SEC - 1;
 logOut : boolean = false;

  constructor(private activeModal: NgbActiveModal, private translationService: TranslationService
    , private router: Router, private loginService:LoginService  ) { }

  ngOnInit() { 
    
    this.isArabNavigation = this.translationService.isCurrentLang(GlobalConstant.LANGUES.ARABE);
    for (let i = GlobalConstant.INACTIVITY_TIMER.COUNTDOWN_SEC - 2; i >= 0; i--) {
      setTimeout(() => this.count = ' ' + i , (GlobalConstant.INACTIVITY_TIMER.COUNTDOWN_SEC - i) * 1000);
    }

    this.loginService.logOutEvent.subscribe((logOut : boolean) => {
      this.logOut = logOut ? logOut : this.logOut ;
      if(this.logOut){
        this.router.navigate(['login'],{queryParams:{inactivity:true}});
        this.activeModal.close();
      }
    })

    this.loginService.closeModalEvent.subscribe((closeModal : boolean) => {
      if(closeModal){
        this.activeModal.close();
      }
    })
       
  }

  public dismiss() {
    this.activeModal.close();
    this.loginService.conditionEvent.emit(false);
  }

}
