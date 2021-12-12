
import { Pipe ,PipeTransform} from '@angular/core';

@Pipe({
  name: 'ratingColor'
})
export class ratingColor implements PipeTransform{
  transform(rate: number) {
    var percentage = (rate/5)*100
    if(percentage >= 90)
      return "#F0BB62";
    else if(percentage <90 && percentage >= 70)
      return "#3F51B5";
    else if(percentage <70 && percentage >= 50)
      return "#781D42";
    else
      return "#F44336";
  }

}
