import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from '@app/models/game';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GameService {
  private http = inject(HttpClient);

  private readonly BASE_URL = `${environment.apiUrl}/games`;
  private readonly API_50_GAMES = `${this.BASE_URL}/50R`;
  private readonly API_SEARCH_GAME = `${this.BASE_URL}/search`;
  private readonly API_BY_IDS = `${this.BASE_URL}/by-ids`;

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

  getGamesByIds(gameIds: string[]): Observable<Game[]> {
    if (!gameIds || gameIds.length === 0) {
      return of([]);
    }

    const params = new HttpParams().set('ids', gameIds.join(','));

    return this.http.get<Game[]>(`${this.API_BY_IDS}`, { params });
  }
}
