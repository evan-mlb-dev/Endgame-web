import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GameStatusCounts } from '@app/models/game-status.enum';
import { UserGameService } from '@app/services/userGameService';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
})
export class Dashboard implements OnInit {
  private userGameService = inject(UserGameService);
  gameCounts: GameStatusCounts | null = null;
  gameCounts$!: Observable<GameStatusCounts>;

  ngOnInit(): void {
    this.userGameService.getGameCounts().subscribe({
      next: (counts) => {
        this.gameCounts = counts;
      },
      error: (err) => {
        console.error('Error, cant get game counts', err);
      },
    });
  }
}
