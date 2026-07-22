import {Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren} from '@angular/core';
import VanillaTilt from 'vanilla-tilt';
import {Game} from '../../models/game';


@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.scss',
  standalone: true,
})
export class GameCard {
  @Input({required: true}) game!: Game;
  @Output() remove = new EventEmitter<number>();
  @ViewChildren('tiltCard') tiltCards!: QueryList<ElementRef>;
  isAnimating = false;

  /*Tilt Card*/

  ngAfterViewInit() {
    this.initTilt();
    this.tiltCards.changes.subscribe(() => {
      this.initTilt();
    });
  }

  initTilt() {
    this.tiltCards.forEach((card: ElementRef) => {
      VanillaTilt.init(card.nativeElement, {
        max: 15,
        speed: 2000,
        glare: true,
        'max-glare': 0.5,
        gyroscope: false,
        perspective: 1000,
        scale: 1.05
      });
    });
  }

  ngOnDestroy() {
    this.tiltCards.forEach((card: ElementRef) => {
      if (card.nativeElement.vanillaTilt) {
        card.nativeElement.vanillaTilt.destroy();
      }
    });
  }

  /*Delete Card*/



  onDelete() {
    this.isAnimating = true;
    setTimeout(() => {
      this.remove.emit(this.game.id);
    }, 500);
  }

}

