import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekdayVn',
  standalone:true
})
export class WeekdayVnPipe implements PipeTransform {

  private readonly weekdays : any = {
    'monday': '2',
    'tuesday': '3',
    ' wednesday': '4',
    'thursday': '5',
    'friday': '6',
    'saturday': '7',
    'sunday': 'CN'
  };

  transform(value: any): string {
    try {
      if (!value) {
        return '';
      }
      value = new Date(value);
      const weekday = value.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      return this.weekdays[weekday] || '';
    } catch (error) {
      return ''
    }


  }
}
