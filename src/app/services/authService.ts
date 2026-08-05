import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

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

  public isSessionValid(): boolean {
    const session = this.getCurrentSession();
    if (!session || !session.token) {
      return false;
    }

    if (this.isTokenExpired(session.token)) {
      this.logout(); // Nettoie automatiquement la session expirée
      return false;
    }

    return true;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return true;

      const decodedPayload = JSON.parse(
        atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/')),
      );

      if (!decodedPayload.exp) return false;

      const currentTime = Math.floor(Date.now() / 1000);
      return decodedPayload.exp < currentTime;
    } catch {
      return true;
    }
  }

  private getSessionFromStorage(): Session | null {
    const saved = localStorage.getItem('userSession');
    if (!saved) {
      return null;
    }
    try {
      const parsed = JSON.parse(saved);
      const session = Session.fromJson(parsed);

      if (session.token && this.isTokenExpired(session.token)) {
        localStorage.removeItem('userSession');
        return null;
      }

      return session;
    } catch (e) {
      console.error('Session Error', e);
      localStorage.removeItem('userSession');
      return null;
    }
  }
}
