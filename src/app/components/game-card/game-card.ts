import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { GameStatus } from '@app/models/game-status.enum';
import { AuthService } from '@app/services/authService';
import { ModalService } from '@app/services/modalService';
import { UserGameService } from '@app/services/userGameService';
import VanillaTilt from 'vanilla-tilt';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.scss',
})
export class GameCard implements AfterViewInit, OnDestroy {
  @Input({ required: true }) game!: Game;
  @Output() remove = new EventEmitter<number>();
  @ViewChild('tiltCard') tiltCard?: ElementRef;

  // Service
  public userGameService = inject(UserGameService);
  public modalService = inject(ModalService);
  private authService = inject(AuthService);
  // Vars
  public isDeleted = false;
  public GameStatus = GameStatus;

  constructor(private hostElement: ElementRef) {}

  ngAfterViewInit() {
    this.initTilt();
  }

  initTilt() {
    const cardEl =
      this.tiltCard?.nativeElement || this.hostElement.nativeElement;

    VanillaTilt.init(cardEl, {
      max: 15,
      speed: 2000,
      glare: true,
      'max-glare': 0.5,
      gyroscope: false,
      perspective: 1000,
      scale: 1.05,
    });
  }

  addGameTo(gameStatus: GameStatus) {
    if (!this.authService.isSessionValid()) {
      this.modalService.openSignInModal();
    } else if (this.game.id) {
      this.userGameService.addUserGame(this.game.id, gameStatus).subscribe({
        next: (res) => console.log('Success !', res),
        error: (err) => console.error('Error :', err),
      });
      this.onDelete();
    }
    this.userGameService.incrementGameCount(gameStatus);
  }

  ngOnDestroy() {
    const cardEl =
      this.tiltCard?.nativeElement || this.hostElement.nativeElement;
    if (cardEl && (cardEl as any).vanillaTilt) {
      (cardEl as any).vanillaTilt.destroy();
    }
  }

  onDelete() {
    this.isDeleted = true;
    setTimeout(() => {
      this.remove.emit(this.game.id);
    }, 500);
  }
}
