import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstant } from '../../core/app.constants';
import { TranslationService } from './translationService';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FileSaverService } from 'ngx-filesaver';


@Injectable()
export class UtilsService {


  constructor(private translationService: TranslationService,
    private httpClient: HttpClient , private toastr: ToastrService, private fileSaverService: FileSaverService) { }

  public sort(array: any[], field: string, order?: string): any[] {
    const sortOrder = order === GlobalConstant.ORDER.DESC ? 1 : -1;
    array.sort((e1: any, e2: any) => {
      const firstObject = field.indexOf('.') === -1 ? e1[field] : e1[field.split('.')[0]][field.split('.')[1]];
      const secondObject = field.indexOf('.') === -1 ? e2[field] : e2[field.split('.')[0]][field.split('.')[1]];

      const condition = (typeof firstObject === 'string' ? firstObject.toUpperCase() < secondObject.toUpperCase()
        : firstObject < secondObject);
      const condition2 = (typeof firstObject === 'string' ? firstObject.toUpperCase() > secondObject.toUpperCase()
        : firstObject > secondObject);

      if (condition) {
        return 1 * sortOrder;
      } else if (condition2) {
        return -1 * sortOrder;
      } else {
        return 0;
      }
    });
    return array;
  }

  public getElementNumber(array: any[]): string {
    if (array.length > 0) {
      return this.translationService.getMessage('GLOBAL.ELEMENTS_NUMBER') + ': ' + array.length;
    }
    return this.translationService.getMessage('GLOBAL.NO_ELEMENT');
  }

  public formatDate(date) {
    return date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0];
  }

  public formatStringToDatePicker(date) {
    const momentDate = moment(date, 'YYYY-MM-DD');
    return { date: { year: momentDate.format('YYYY'), month: momentDate.format('M'), day: momentDate.format('D') } };
  }

  public formatDatePickerToString(date, time) {
    if (date && date.date && time) {
      if (!time.hour) {
        time.hour = 0;
      }
      if (!time.minute) {
        time.minute = 0;
      }
      const dateObject = date.date;
      const dateString = dateObject.day + '-' + dateObject.month + '-' + dateObject.year + ' ' + time.hour + ':' + time.minute;
      return moment.utc(dateString, 'D-M-YYYY H:m').format();
    } else {
      return null;
    }
  }

  public formatDateToDatePicker(date) {
    if (date) {
      const momentDate = moment.utc(date);
      const dateTime = {
        date: { year: momentDate.format('YYYY'), month: momentDate.format('M'), day: momentDate.format('D') },
        time : { hour : parseInt(momentDate.format('H')),  minute : parseInt(momentDate.format('m')) }
      };
      return dateTime;
    } else {
      return null;
    }
  }
  public download(httpMethod: string, url: string, contentType: string, body, blobType: string, fileName: string) {
    const headers = new HttpHeaders().set('Content-Type', contentType);

    let request;
    if (httpMethod === GlobalConstant.HTTP_METHOD.GET) {
      request = this.httpClient.get(url, { headers, responseType: 'blob' });
    } else if (httpMethod === GlobalConstant.HTTP_METHOD.POST) {
      request = this.httpClient.post(url, body, { headers, responseType: 'blob' });
    }
    request.subscribe(
      (data: Blob) => {
        let file;
        if (blobType) {
          file = new Blob([data], { type: blobType });
        } else {
          file = new Blob([data]);
        }
        this.fileSaverService.save(file, fileName);
      },
      (err: any) => {
        this.toastr.error("Vous n'avez pas le droit pour télécharger cette note de synthèse !");
      }
    );
  }

  public existeInArray(object, array, field) {
    if (object && array) {
      return array.find(x => x[field] === object[field]);
    }
  }

  public getKeys(map) {
    return Object.keys(map);
  }

  public getValue(map, key) {
    return map[key];
  }

  public convertToDropdownOptions(array, id, property) {
    const result : any[] = [];
    for (const object of array) {
      result.push({ id: object[id], name: object[property] });
    }
    return result;
  }

  public isEven(number) {
    return Math.abs(number % 2) === 1;
  }

  public checkDuplicateInArray(array, property) {
    let seenDuplicate = false;
    const testObject = {};
    array.map(function (item) {
      const itemPropertyName = item[property].toLowerCase();
      if (itemPropertyName in testObject) {
        testObject[itemPropertyName].duplicate = true;
        item.duplicate = true;
        seenDuplicate = true;
      } else {
        testObject[itemPropertyName] = item;
        delete item.duplicate;
      }
    });
    return seenDuplicate;
  }

  checkRestore(objComplement) {
    if (objComplement === 'DELETED') {
      return true;
    } else {
      return false;
    }
  }

  getNbrInstance() {
    return JSON.parse(localStorage.getItem('nbrInstance')|| '{}');
  }

  incrementNbrInstance() {
    const numberInstance = JSON.parse(localStorage.getItem('nbrInstance')|| '{}');
    localStorage.setItem('nbrInstance', (numberInstance + 1).toString());
  }

  decrementNbrInstance() {
    let nbrInstance = JSON.parse(localStorage.getItem('nbrInstance')|| '{}');
    localStorage.setItem('nbrInstance', (nbrInstance <= 0 ? 0 : nbrInstance - 1).toString());
  }

}
