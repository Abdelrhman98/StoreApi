
import { Pipe ,PipeTransform} from '@angular/core';

@Pipe({
  name: 'toPercentage'
})
export class toPercentage implements PipeTransform{
  transform(rate: number) {
    return (((rate/5)*100).toFixed(2)).toString()+"%";
  }

}
