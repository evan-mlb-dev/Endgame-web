import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '@app/models/session';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly BASE_URL = 'http://localhost:8080/api/auth';
  private readonly API_LOGIN = `${this.BASE_URL}/login`;
  private readonly API_REGISTER = `${this.BASE_URL}/register`;

  private userSessionBehavior = new BehaviorSubject<Session | null>(
    this.getSessionFromStorage(),
  );

  userSession$: Observable<Session | null> =
    this.userSessionBehavior.asObservable();

  constructor(private http: HttpClient) {
    console.debug(this.userSession$);
    console.debug(localStorage);
  }

  login(credentials: any) {
    return this.http.post(this.API_LOGIN, credentials).pipe(
      tap((sessionJson) => {
        const session = Session.fromJson(sessionJson);
        this.userSessionBehavior.next(session);
        localStorage.setItem('userSession', JSON.stringify(session));
      }),
    );
  }

  logout() {
    localStorage.removeItem('userSession');
    this.userSessionBehavior.next(null);
  }

  register(userData: any) {
    return this.http.post(this.API_REGISTER, userData);
  }

  public getCurrentSession(): Session | null {
    return this.userSessionBehavior.value;
  }

  private getSessionFromStorage(): Session | null {
    const saved = localStorage.getItem('userSession');
    if (!saved) {
      return null;
    }
    try {
      const parsed = JSON.parse(saved);
      return Session.fromJson(parsed);
    } catch (e) {
      console.error('Session Error', e);
      localStorage.removeItem('userSession');
      return null;
    }
  }
}
