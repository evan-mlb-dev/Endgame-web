import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}


  private readonly BASE_URL = 'http://localhost:8080/api/auth';
  private readonly API_LOGIN = `${this.BASE_URL}/login`;
  private readonly API_REGISTER = `${this.BASE_URL}/register`;

  login(credentials: any) {
    return this.http.post('/api/auth/login', credentials).pipe(
      tap((user) => {
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      }),
    );
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('useraze');
  }

  register(userData: any) {
    return this.http.post(this.API_REGISTER, userData);
  }
}
