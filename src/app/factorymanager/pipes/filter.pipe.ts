import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, productCategory: string): any[] {
    const result : string[] = [];

    if(value.length === 0 || filterString === '' || productCategory === '') {
      return value;
    }

    for(const item of value) {
      if(item[productCategory] === filterString) {
        result.push(item);
      }
    }

    return result;
  }

}
