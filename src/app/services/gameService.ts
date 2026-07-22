import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {
  private http = inject(HttpClient);

  private readonly BASE_URL = 'http://localhost:8080/api/games';
  private readonly API_50_GAMES = `${this.BASE_URL}/50R`;
  private readonly API_SEARCH_GAME = `${this.BASE_URL}/search`;

  getAllGames(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL);
  }

  get50Games(): Observable<any[]> {
    return this.http.get<any[]>(this.API_50_GAMES);
  }

  searchGames(name: string): Observable<any[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<any[]>(this.API_SEARCH_GAME, { params });
  }
}
