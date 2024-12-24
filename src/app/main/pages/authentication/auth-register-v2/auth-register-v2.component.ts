import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { locale as english } from 'app/main/pages/authentication/i18n/en';
import { locale as arabic } from 'app/main/pages/authentication/i18n/en';
import { CoreConfigService } from '@core/services/config.service';
import { CoreTranslationService } from '@core/services/translation.service';
import { AuthenticationService } from 'app/auth/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-register-v2',
  templateUrl: './auth-register-v2.component.html',
  styleUrls: ['./auth-register-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthRegisterV2Component implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public registerForm: UntypedFormGroup;
  public submitted = false;
  public loading = false;
  public filterOptions = [
    {

      text: '+966',
      value: '+966'
    },
    {

      text: '+995',
      value: '+995'
    },
    {

      text: '+20',
      value: '+20'
    },
  ]
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   * @param {CoreTranslationService} _coreTranslationService
   * @param {AuthenticationService} _authenticationService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: UntypedFormBuilder,
    private _coreTranslationService: CoreTranslationService,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {
    this._unsubscribeAll = new Subject();
    this._coreTranslationService.translate(english, arabic);

    // Configure the layout
    // this._coreConfigService.config = {
    //   layout: {
    //     navbar: {
    //       hidden: true
    //     },
    //     menu: {
    //       hidden: true
    //     },
    //     footer: {
    //       hidden: true
    //     },
    //     customizer: false,
    //     enableLocalStorage: false
    //   }
    // };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // Login
    this.loading = true;
    this._authenticationService
      .Register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data)
            this._authenticationService
              .login(this.registerForm.value.email, this.registerForm.value.password)
              .pipe(first())
              .subscribe(
                data => {
                  this._router.navigate(['/']);
                }
              );
          // this._router.navigate(['/']);
        },
        error => {

          this.loading = false;
        }
      );
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.registerForm = this._formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      url: ['', [Validators.required, Validators.pattern(urlRegex)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      countryCode: ['+966', [Validators.required]],
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
