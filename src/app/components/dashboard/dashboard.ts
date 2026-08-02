import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GameStatusCounts } from '@app/models/game-status.enum';
import { UserGameService } from '@app/services/userGameService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
})
export class Dashboard implements OnInit, OnDestroy {
  private userGameService = inject(UserGameService);
  gameCounts: GameStatusCounts | null = null;
  private sub?: Subscription;

  ngOnInit(): void {
    this.userGameService.refreshGameCounts();
    this.sub = this.userGameService.gameCounts$.subscribe((counts) => {
      this.gameCounts = counts;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
