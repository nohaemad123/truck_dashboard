import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(phoneNumber: string, password: string) {
    const httpHeaders = new HttpHeaders({
      Language: `AR`,
    });
    return this._http
      .post<any>(`${environment.hostAPI}/Users/Login`, { phoneNumber, password }, { headers: httpHeaders })
      .pipe(
        map(APiuser => {
          // console.log('APiuser',APiuser.data);
          
          // login successful if there's a jwt token in the response
          let user = new User();
          user.setUser(APiuser.data)
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Display welcome toast!
            if(APiuser.data.userTypeId=='3'){
              setTimeout(() => {
                this._toastrService.success(
                  'تم تسجيل الدخول بنجاح ',
                  '👋  مرحبا , ' + user.userNameAr + '!',
                  { toastClass: 'toast ngx-toastr', closeButton: true }
                );
              }, 2500);
            }
        

            // notify
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }
  Register(payload: any) {
    const httpHeaders = new HttpHeaders({
      Language: `AR`,
    });
    return this._http
      .post<any>(`${environment.hostAPI}/Users/Register`, payload, { headers: httpHeaders });
  }
  RegisterCustomer(payload: any) {
    const httpHeaders = new HttpHeaders({
      Language: `AR`,
    });
    return this._http
      .post<any>(`${environment.hostAPI}/Auth/registerUser`, payload, { headers: httpHeaders });
  }
  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
  
  saveToken(accessToken:string,refreshToken:string) {
    let currentUser = this.currentUserValue;
    currentUser.refreshToken=refreshToken;
    currentUser.token=accessToken;
    if (currentUser && currentUser.token && currentUser.refreshToken) {
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

    }
  }
  refreshToken() {
    const currentUser = this.currentUserValue;
    if (currentUser && currentUser.token && currentUser.refreshToken) {

      const httpOptions = {
        headers: new HttpHeaders({Language: `AR`, 'Content-Type': 'application/json' })
      };
      return this._http
        .post<any>(`${environment.hostAPI}/Auth/refresh-token`, { accessToken: currentUser.token, refreshToken: currentUser.refreshToken }, httpOptions);
    }
  }
}
