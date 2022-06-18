import { TranslationService } from './../../services/translationService';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../login/login.service';
import { GlobalConstant } from '../../../core/app.constants';
import { Router } from '@angular/router';
import { ModalDialogService } from '../modal-dialog/modal-dialog.service';
import { InactivityComponent } from './inactivity/inactivity.component';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { UtilsService } from '../../services/utilsService';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.utilsService.decrementNbrInstance();
  }

  nbrInstance=0;
  static displayLeftMenu = true;
  static displaynavbar = false;
  displaycollape = true;
  isArabNavigation;
  currentUser;
  condtion = false;
  nbrWatcher=0;
  mode;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date ;

  environnementMode = GlobalConstant.ENVIRONNEMENT_MODE;
  notification;
  @ViewChild('motCleRecherche') motCleRecherche!: ElementRef;
  
  constructor(private translate: TranslateService, private translationService: TranslationService, private loginService: LoginService
    , private router: Router, private modalDialogService: ModalDialogService
    , private idle: Idle, private utilsService: UtilsService) {
      
      this.utilsService.incrementNbrInstance();
      this.currentUser = loginService.getCurrentUser();
      const defaultLang = this.translationService.getCurrentUserLanguage()
        ? this.translationService.getCurrentUserLanguage() : GlobalConstant.LANGUES.FRANCAIS;
      translate.setDefaultLang('fr');
      this.setCurrentLangage(defaultLang);

      // idle timeout
      idle.setIdle(GlobalConstant.INACTIVITY_TIMER.SESSION_TIMEOUT_SEC);

      // idle countdown
      idle.setTimeout(GlobalConstant.INACTIVITY_TIMER.COUNTDOWN_SEC);

      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      //Détéction de la réactivation de la session
      idle.onIdleEnd.subscribe(() => {
        this.loginService.closeModalEvent.emit(true);
      });

      //Détéction de la fin du countdown
      idle.onTimeout.subscribe(() => {
          this.loginService.logout();
          this.router.navigate(['/login']);
          this.loginService.closeModalEvent.emit(true);
      });

      //Détéction de la fin du temps de session
      idle.onIdleStart.subscribe(() => {
        if(this.router.url !== "/login") {
          this.showModal();
        }
      });

      this.reset();

  }

  reset() {
    this.idle.watch();
  }

  static showLeftMenu() {
    LayoutComponent.displayLeftMenu = true;
  }

  static hideLeftMenu() {
    LayoutComponent.displayLeftMenu = false;
  }

  ngOnInit() {
    this.mode = this.loginService.getMode();
  }
  
  showModal() {
    this.modalDialogService.open(InactivityComponent);
  }

  toggleMenu() {
    LayoutComponent.displayLeftMenu = !LayoutComponent.displayLeftMenu;
  }

  toggle() {
    LayoutComponent.displaynavbar = !LayoutComponent.displaynavbar;
  }

  setCurrentLangage(lang) {
    this.translate.use(lang);
    this.translationService.setCurrentUserLanguage(lang);
    this.isArabNavigation = lang === GlobalConstant.LANGUES.ARABE ? true : false;
  }

  stateLeftMenu() {
      return LayoutComponent.displayLeftMenu;
  }

  stateCollapse() {
    if (window.innerWidth < 769) {
      return true;
    }
    return false;
  }

}
