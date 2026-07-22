import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameService} from '../../services/gameService';
import {GameCard} from '../game-card/game-card';
import {Game} from '../../models/game';
import {Searchbar} from '../searchbar/searchbar';
import {Dashboard} from '../dashboard/dashboard';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, GameCard, Searchbar, Dashboard],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
})
export class GameList implements OnInit {
  private gameService = inject(GameService);
  games: Game[] = [];
  search: string = '';

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames() {
    if (this.search.length === 0) {
     /* Get 50 random games*/
      this.gameService.get50Games().subscribe({
        next: (data) => {

          this.games = data.map(gameData => new Game(
            gameData.id,
            gameData.name,
            gameData.released,
            gameData.backgroundImage,
            gameData.rating,
            gameData.metacritic
          ))
            .sort((a, b) => b.rating - a.rating);
        },
        error: (err) => {
          console.error("Error can't load game list", err);
        }
      });
    }
    else {
      this.gameService.searchGames(this.search).subscribe({
        next: (data) => {
          this.games = data.map(gameData => new Game(
            gameData.id,
            gameData.name,
            gameData.released,
            gameData.backgroundImage,
            gameData.rating,
            gameData.metacritic
          ));
        },
        error: (err) => {
          console.error("0 games found.", err);
        }
      });
    }
  }

  onSearch(term: string) {
    this.search = term;
    this.loadGames();
  }

  idBeingDeleted: number | null = null;
  deleteGame(gameId: number) {
    this.games = this.games.filter(g => g.id !== gameId);
  }
}
