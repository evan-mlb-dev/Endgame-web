import { Component } from '@angular/core';
import { GameList } from '../game-list/game-list';

@Component({
  selector: 'app-home',
  imports: [GameList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
})
export class Home {}
