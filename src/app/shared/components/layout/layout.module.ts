import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { SharedModule } from '../../modules/shared.module';
import { InactivityComponent } from './inactivity/inactivity.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

@NgModule({
  imports: [
    BrowserAnimationsModule,
     SharedModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  declarations: [LayoutComponent, InactivityComponent],
  entryComponents: [InactivityComponent]
})
export class LayoutModule { }
