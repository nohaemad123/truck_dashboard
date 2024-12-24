import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @param {string} key
   *
   * @returns {any}
   */
  transform(items: any[], searchText: string, key: string[]): any[] {
    if (!items) return [];
    if (!searchText) return items;
    console.log('searchText',searchText);
    console.log('key',key);

    searchText = searchText?.toLowerCase();
         
    return items.filter(it => {
      return it[key[0]]?.toLowerCase().includes(searchText)||it[key[1]]?.toLowerCase().includes(searchText)||it[key[2]]?.toLowerCase().includes(searchText)||it[key[3]]?.toLowerCase().includes(searchText)||it[key[4]]?.toLowerCase().includes(searchText);
    });
  }
}
