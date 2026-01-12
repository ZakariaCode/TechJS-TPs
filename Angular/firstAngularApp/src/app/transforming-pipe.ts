import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transforming'
})
export class TransformingPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return "The name of the book is : " + value.toUpperCase();
  }

}
