import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchAll } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:3000/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient,
    public router: Router) { }
  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        Swal.fire({
          icon: "success",
          title: 'Login Successful'
        })
        this.router.navigate(['profile']);
      }, (error) => {
        Swal.fire({
          icon: "error",
          title: 'Something Went Wrong'
        })
      }
      )
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');

    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
}
