import { Component } from '@angular/core';
import { GameList } from '../game-list/game-list';

@Component({
  selector: 'app-main-layout-component',
  imports: [GameList],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.scss',
})
export class MainLayoutComponent {}
