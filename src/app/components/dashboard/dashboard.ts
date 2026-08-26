import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { GameStatusCounts } from '@app/models/game-status.enum';
import { AuthService } from '@app/services/authService';
import { UserGameService } from '@app/services/userGameService';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
})
export class Dashboard implements OnInit, OnDestroy {
  // services
  private userGameService = inject(UserGameService);
  private authService = inject(AuthService);
  private router = inject(Router);

  //route
  private route = inject(ActivatedRoute);

  // vars
  gameCounts: GameStatusCounts | null = null;
  animatedStatus = signal<string | null>(null);

  // subs
  private subCounts?: Subscription;
  private subAnimation?: Subscription;

  public status = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('status'))),
    { requireSync: true },
  );

  navigateToStatus(status: string): void {
    this.triggerAnimation(status);
    setTimeout(() => {
      this.router.navigate(['/backlog'], { queryParams: { status } });
    }, 100);
  }

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
