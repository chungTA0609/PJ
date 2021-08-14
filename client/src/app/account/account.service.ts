import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  iUser!: IUser;
  private currentUserSource = new BehaviorSubject<IUser>(this.iUser);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient, private router: Router) { }
  login(values : any){
    return this.http.get(this.baseUrl + 'account/login' + values)
      .pipe(
        map((user: any) => {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        })
      );
  }
  register(values: any){
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user : any) => {
        if(user){
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(this.iUser);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string){
    return this.http.get(this.baseUrl + '/account/emailexists?email=' + email);
  }
}