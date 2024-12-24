import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomFormValidators {

    static greaterThan(startControl: number): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
            const start: number = startControl;
            const end: number = endControl.value;
            //endControl.parent?.updateValueAndValidity();
            if ((!start && start != 0) || (!end && end != 0)) {

                return null;
            }
            if (start > end) {
                return { greaterThan: true };
            }
            return null;
        };
    }
    static lessThan(startControl: number): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
            const start: number = startControl;
            const end: number = endControl.value;
            //endControl.parent?.updateValueAndValidity();

            if ((!start && start != 0) || (!end && end != 0)) {

                return null;
            }
            if (start < end) {
                return { lessThan: true };
            }
            return null;
        };
    }
    static equalTo(startControl: number): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
            const start: number = startControl;
            const end: number = endControl.value;
            //endControl.parent?.updateValueAndValidity();

            if ((!start && start != 0) || (!end && end != 0)) {
                return null;
            }
            if (start > end || start < end) {
                return { equalTo: true };
            }
            return null;
        };
    }
    static inBetween(MinLimit: number, MaxLimit: number): ValidatorFn {
        return (CurrentControl: AbstractControl): ValidationErrors | null => {
            const Min: number = MinLimit;
            const Max: number = MaxLimit;
            const CurrentValue: number = CurrentControl.value;
            // CurrentControl.parent?.updateValueAndValidity();

            if (!Min || !CurrentValue || !Max) {
                return null;
            }
            if (Min > CurrentValue || CurrentValue > Max) {
                return { inBetween: true };
            }
            return null;
        };
    }
    static greaterThanInput(Input: string): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
            try {

                const start: number = parseFloat(endControl.parent?.get(Input)?.value);
                const end: number = parseFloat(endControl.value);
                //endControl.parent?.updateValueAndValidity();
                if ((!start && start != 0) || (!end && end != 0)) {

                    return null;
                }
                if (start > end) {
                    return { greaterThanInput: true };
                }
                return null;

            } catch (error) {
                return null;

            }
        };
    }
    static lessThanInput(Input: string): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
            try {

                const start: number = parseFloat(endControl.parent?.get(Input)?.value);
                const end: number = parseFloat(endControl.value);
                //endControl.parent?.updateValueAndValidity();
                // endControl.parent?.get(Input)?.updateValueAndValidity();
                if ((!start && start != 0) || (!end && end != 0)) {
                    return null;
                }

                if (start < end) {
                    return { lessThanInput: true };
                }
                return null;

            } catch (error) {
                return null;

            }
        };
    }
    static equalToInput(Input: string): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
            try {

                const start: number = parseFloat(endControl.parent?.get(Input)?.value);
                const end: number = parseFloat(endControl.value);
                //endControl.parent?.updateValueAndValidity();
                if ((!start && start != 0) || (!end && end != 0)) {

                    return null;
                }
                if (start > end || start < end) {
                    return { equalToInput: true };
                }
                return null;

            } catch (error) {
                return null;

            }
        };
    }
    static inBetweenInputs(MinLimitInput: string, MaxLimitInput: string): ValidatorFn {
        return (CurrentControl: AbstractControl): ValidationErrors | null => {
            try {
                let Parent = CurrentControl.parent?.controls as { [key: string]: AbstractControl; };
                const Min: number = parseFloat(Parent[MinLimitInput].value);
                const Max: number = parseFloat(Parent[MaxLimitInput].value);
                const CurrentValue: number = parseFloat(CurrentControl.value);
                // CurrentControl.parent?.updateValueAndValidity();
                if (!Min || !CurrentValue || !Max) {
                    return null;
                }
                if (Min > CurrentValue || CurrentValue > Max) {
                    return { inBetweenInputs: true };
                }
                return null;
            } catch (error) {
                console.log("error:", error)
                return null;

            }

        };
    }
    static matchInput(Input: string): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
            try {

                const start: string = endControl.parent?.get(Input)?.value;
                const end: string = endControl.value;
                //endControl.parent?.updateValueAndValidity();
                // endControl.parent?.get(Input)?.updateValueAndValidity();
                if ((!start) || (!end)) {
                    return null;
                }
                if (start != end) {
                    return { matchInput: true };
                }
                return null;

            } catch (error) {
                return null;

            }
        };
    }

    static greaterThanDate(startControl: string | Date): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
            try {
                debugger;
                const start: string = typeof startControl == "string" ? new Date(startControl).toISOString() : startControl.toISOString();;
                const end: string = typeof endControl.value == "string" ? new Date(endControl.value).toISOString() : endControl.value.toISOString();
                //endControl.parent?.updateValueAndValidity();
                if ((!start && start != "") || (!end && end != "")) {

                    return null;
                }
                if (start > end) {
                    return { greaterThan: true };
                }
                return null;
            } catch (error) {
                return null;

            }
        };
    }
    static lessThanDate(startControl: string | Date): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
            const start: string = typeof startControl == "string" ? new Date(startControl).toISOString() : startControl.toISOString();;
            const end: string = typeof endControl.value == "string" ? new Date(endControl.value).toISOString() : endControl.value.toISOString();
            //endControl.parent?.updateValueAndValidity();
            if ((!start && start != "") || (!end && end != "")) {

                return null;
            }
            if (start < end) {
                return { lessThan: true };
            }
            return null;
        };
    }



    static greaterThanDateInput(Input: string): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
            try {

                const start: string = new Date(endControl.parent?.get(Input)?.value).toISOString();
                const end: string = new Date(endControl.value).toISOString()
                //endControl.parent?.updateValueAndValidity();
                if ((!start && start != "") || (!end && end != "")) {

                    return null;
                }
                if (start > end) {
                    return { greaterThanInput: true };
                }
                return null;

            } catch (error) {
                return null;

            }
        };
    }
    static lessThanDateInput(Input: string): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
            try {

                const start: string = new Date(endControl.parent?.get(Input)?.value).toISOString();
                const end: string = new Date(endControl.value).toISOString()
                if ((!start && start != "") || (!end && end != "")) {
                    return null;
                }

                if (start < end) {
                    return { lessThanInput: true };
                }
                return null;

            } catch (error) {
                return null;

            }
        };
    }
}
