import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameStatusCounts } from '@app/models/game-status.enum';
import { AuthService } from '@app/services/authService';
import { UserGameService } from '@app/services/userGameService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
})
export class Dashboard implements OnInit, OnDestroy {
  // services
  private userGameService = inject(UserGameService);
  private authService = inject(AuthService);
  // vars
  gameCounts: GameStatusCounts | null = null;
  animatedStatus = signal<string | null>(null);
  // subs
  private subCounts?: Subscription;
  private subAnimation?: Subscription;

  ngOnInit(): void {
    if (this.authService.isSessionValid()) {
      this.userGameService.refreshGameCounts();
      this.subCounts = this.userGameService.gameCounts$.subscribe((counts) => {
        this.gameCounts = counts;
      });
    } else {
      this.gameCounts = {
        TO_PLAY: 0,
        PLAYING: 0,
        COMPLETED: 0,
        DROPPED: 0,
        ON_HOLD: 0,
      };
    }

    this.subAnimation = this.userGameService.animatedStatus$.subscribe(
      (status) => {
        this.triggerAnimation(status);
      },
    );
  }

  private triggerAnimation(statusKey: string | null): void {
    this.animatedStatus.set(statusKey);
    setTimeout(() => {
      this.animatedStatus.set('none');
    }, 600);
  }

  ngOnDestroy(): void {
    this.subCounts?.unsubscribe();
    this.subAnimation?.unsubscribe();
  }
}
