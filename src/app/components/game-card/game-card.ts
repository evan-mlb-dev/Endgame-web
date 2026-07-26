import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
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

  isDeleted = false;

  ngAfterViewInit() {
    this.initTilt();
  }

  initTilt() {
    // Si la référence #tiltCard existe dans le HTML
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

  ngOnDestroy() {
    const cardEl =
      this.tiltCard?.nativeElement || this.hostElement.nativeElement;
    if (cardEl && (cardEl as any).vanillaTilt) {
      (cardEl as any).vanillaTilt.destroy();
    }
  }

  constructor(private hostElement: ElementRef) {}

  /* Delete Card */
  onDelete() {
    this.isDeleted = true;
    setTimeout(() => {
      this.remove.emit(this.game.id);
    }, 300);
  }
}
