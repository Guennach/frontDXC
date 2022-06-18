import { Injectable } from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  public open() {
    setTimeout(() => SpinnerComponent.displaySpinner = true,0);
  }

  public close() {
    setTimeout(() => SpinnerComponent.displaySpinner = false, 0);
  }

}
