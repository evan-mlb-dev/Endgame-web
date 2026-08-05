import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserGameResponseDto } from '@app/models/dto/userGameResponseDto';
import { GameStatus, GameStatusCounts } from '@app/models/game-status.enum';
import { UserGamesMap } from '@app/models/userGame';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGameService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8080/api/usergame';
  public lastUpdatedGame = signal<UserGameResponseDto | null>(null);

  // Game Counts Behavior
  private gameCountsSubject = new BehaviorSubject<GameStatusCounts | null>(
    null,
  );
  public gameCounts$: Observable<GameStatusCounts | null> =
    this.gameCountsSubject.asObservable();
  // Animation Behavior
  private animatedStatusSubject = new Subject<keyof GameStatusCounts>();
  public animatedStatus$: Observable<keyof GameStatusCounts | null> =
    this.animatedStatusSubject.asObservable();

  public incrementGameCount(
    status: keyof GameStatusCounts,
    amount: number = 1,
  ): void {
    const currentCounts = this.gameCountsSubject.getValue();

    if (!currentCounts) return;

    this.gameCountsSubject.next({
      ...currentCounts,
      [status]: (currentCounts[status] || 0) + amount,
    });
    this.animatedStatusSubject.next(status);
  }

  refreshGameCounts(): void {
    this.getGameCounts().subscribe({
      next: (counts) => {
        this.gameCountsSubject.next(counts);
      },
      error: (err) => {
        console.error('Error, cant get game counts', err);
      },
    });
  }

  getUserGames(status?: GameStatus | null): Observable<UserGamesMap> {
    let params = new HttpParams();
    if (status) {
      params = params;
    }
    return this.http.get<UserGamesMap>(`${this.BASE_URL}`, {
      params,
    });
  }

  getGameCounts(): Observable<GameStatusCounts> {
    return this.http.get<GameStatusCounts>(`${this.BASE_URL}/counts`);
  }

  addUserGame(
    gameId: number,
    newStatus: GameStatus,
  ): Observable<UserGameResponseDto> {
    const params = new HttpParams()
      .set('gameId', gameId)
      .set('newStatus', newStatus);

    return this.http
      .post<UserGameResponseDto>(this.BASE_URL, null, { params })
      .pipe(
        tap((response) => {
          this.lastUpdatedGame.set(response);
        }),
      );
  }
}
