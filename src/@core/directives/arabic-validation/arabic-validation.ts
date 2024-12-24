import { Attribute, Directive, ElementRef, HostListener, Input } from "@angular/core";
import { AbstractControl,NG_VALIDATORS,Validator } from "@angular/forms";

@Directive({
    selector: '[appArabicValidation]'

  })
  export class ArabicValidation{
    @Input('validateArabic') validateArabic: AbstractControl;

    @HostListener('keydown', ['$event'])
    onKeyDown(event){        
      if (this.validateArabic) {
        const oldValidator = this.validateArabic.validator;
        if (oldValidator) {
          this.validateArabic.setValidators([this.validateString, oldValidator]);
          return;
        }
        this.validateArabic.setValidators([this.validateString]);
        this.validateArabic.updateValueAndValidity();
  
      }

    }
    
    validateString(control: AbstractControl) : {[key: string]: any} | null {
      // console.log('control',control);
    var  exp:any=/^أ-ي/;
    var  arabicCharUnicodeRange = /[\u0600-\u06FF]/;

        return arabicCharUnicodeRange.test(control.value)
          ? null
          : { invalidArabicInput: true };
      }

      

  ngAfterViewInit(): void {   
      if (this.validateArabic.touched) {
        this.validateArabic.setErrors(null);
     }


  }


}
