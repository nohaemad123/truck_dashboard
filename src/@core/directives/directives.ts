import { NgModule } from '@angular/core';

import { FeatherIconDirective } from '@core/directives/core-feather-icons/core-feather-icons';
import { RippleEffectDirective } from '@core/directives/core-ripple-effect/core-ripple-effect.directive';
import { ArabicValidation } from './arabic-validation/arabic-validation';

@NgModule({
  declarations: [RippleEffectDirective, FeatherIconDirective,ArabicValidation],
  exports: [RippleEffectDirective, FeatherIconDirective,ArabicValidation]
})
export class CoreDirectivesModule {}
