import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp'
})
export class TempPipe implements PipeTransform {

  transform(value: number|undefined, ...args: unknown[]): unknown {
    let argumentos='';
    //for(let arg of args){
    //  argumentos+=args;

  //  }
   // return value +'ºC ' +argumentos;

   
    return value +'ºC ';

  }

}
