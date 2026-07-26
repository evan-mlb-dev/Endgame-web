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

  // Correction 1 : Typage du EventEmitter et renommage en "remove" pour matcher (remove) dans le HTML
  @Output() remove = new EventEmitter<number>();

  // Correction 2 : Utilisation de ViewChild au lieu de ViewChildren pour cibler la carte unique
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
    }, 500);
  }
}
