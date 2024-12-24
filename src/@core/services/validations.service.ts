import { Injectable } from '@angular/core';
import { CoreTranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  
  constructor(private coreTranslationService : CoreTranslationService) { }

  checkIfControlsInValid(form:any,translateKey:string){
    let arr:any =[]
    let key_translated
         for(let key in form.controls){
          if(form.controls[key].invalid && key)
         {
          key_translated = this.coreTranslationService.instant(translateKey+'.'+key);
          if(key_translated)
          {
           console.log(key , "--------" , key_translated);
          arr.push(key_translated);
         
         }
         }
          
         }
         return arr.toString()

  }
}
