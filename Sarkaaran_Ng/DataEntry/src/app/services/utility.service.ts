import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable()
export class Utilities {
  formatDateFromDatePickerObject(date: any, time: any): any {
    if (date !== null && date !== undefined && date !== '') {
      let month = date.month.toString();
      let day = date.day.toString();
      month = this.formatDateValue(month);
      day = this.formatDateValue(day);
      if (time !== "") {
        let hour = time.hour.toString();
        let minute = time.minute.toString();
        let second = time.second.toString();
        hour = this.formatDateValue(hour);
        minute = this.formatDateValue(minute);
        second = this.formatDateValue(second);

        return date.year.toString() + '-' + month + '-' + day + "T" + hour + ':' + minute + ':' + second + '.000';
      }
      else {
        return date.year.toString() + '-' + month + '-' + day;
      }
    }
    return null;
  }

  private formatDateValue(value: string): string {
    if (value.length < 2) {
      value = "0" + value;
    }
    return value;
  }

  formatDate(dateValue: string, format: string): string {
    let res: Date = new Date(dateValue);
    var datePipe = new DatePipe('en-US');
    return datePipe.transform(dateValue, format);
  }

  toNgbDate(date: any): any {
    if (date) {
      date = this.formatDate(date, 'yyyy-MM-dd')
      const [year, month, day] = date.split('-');
      console.log(year)
      console.log(month)
      console.log(day)
      const obj = {
        year: parseInt(year), month: parseInt(month), day:
          parseInt(day.split(' ')[0].trim())
      };
      return obj;
    }
  }
}
