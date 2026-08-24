import { HttpClient, HttpParams } from '@angular/common/http'; // Importe HttpParams pour plus de propreté
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class MyListService {
  private http = inject(HttpClient);

  private readonly BASE_URL = `${environment.apiUrl}/games`;
  private readonly API_50_GAMES = `${this.BASE_URL}/50R`;
  private readonly API_SEARCH_GAME = `${this.BASE_URL}/search`;

  addToPlanToPlay(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL);
  }

  addToPlaying(name: string): Observable<any[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<any[]>(this.API_SEARCH_GAME, { params });
  }

  addToCompleted(): Observable<any[]> {
    return this.http.get<any[]>(this.API_50_GAMES);
  }
}
