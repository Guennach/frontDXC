import { Pipe, PipeTransform } from '@angular/core';
import { GlobalConstant } from '../../core/app.constants';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: Date, format, isArabNavigation) {
    const momentUtc = moment.utc(date);
    if (date && format) {
      if (GlobalConstant.DATE_FORMAT[format]) {
        if(isArabNavigation && format === 'DATE_STANDARD'){
          return momentUtc.format(GlobalConstant.DATE_FORMAT.DATE_STANDARD_AR);
        }
        return momentUtc.format(GlobalConstant.DATE_FORMAT[format]);
      } else {
        return momentUtc.format(GlobalConstant.DATE_FORMAT.DATE_STANDARD);
      }
      return momentUtc.format(GlobalConstant.DATE_FORMAT.DATE_STANDARD);
    }else {
      return null;
    }
  }


}
