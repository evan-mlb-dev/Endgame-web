import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserGameResponseDto } from '@app/models/userGameResponseDto';
import { GameStatus, GameStatusCounts } from '@app/models/game-status.enum';

@Injectable({
  providedIn: 'root',
})
export class UserGameService {
  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8080/api/usergame';
  public lastUpdatedGame = signal<UserGameResponseDto | null>(null);

  private gameCountsSubject = new BehaviorSubject<GameStatusCounts | null>(
    null,
  );
  public gameCounts$: Observable<GameStatusCounts | null> =
    this.gameCountsSubject.asObservable();

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
