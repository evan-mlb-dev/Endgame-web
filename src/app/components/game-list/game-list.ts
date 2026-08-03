import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Game } from '../../models/game';
import { GameService } from '../../services/gameService';
import { GameCard } from '../game-card/game-card';
import { Searchbar } from '../searchbar/searchbar';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, GameCard, Searchbar],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
})
export class GameList implements OnInit {
  private gameService = inject(GameService);

  games = signal<Game[]>([]);
  search = signal<string>('');
  idBeingDeleted = signal<number | null>(null);

  public isScrolled = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 10);
  }

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames() {
    const searchTerm = this.search();

    if (searchTerm.length === 0) {
      this.gameService.get50Games().subscribe({
        next: (data) => {
          const mapped = data
            .map(
              (gameData) =>
                new Game(
                  gameData.id,
                  gameData.name,
                  gameData.released,
                  gameData.backgroundImage,
                  gameData.rating,
                  gameData.metacritic,
                ),
            )
            .sort((a, b) => b.rating - a.rating);

          this.games.set(mapped);
        },
        error: (err) => {
          console.error("Error can't load game list", err);
        },
      });
    } else {
      this.gameService.searchGames(searchTerm).subscribe({
        next: (data) => {
          const mapped = data.map(
            (gameData) =>
              new Game(
                gameData.id,
                gameData.name,
                gameData.released,
                gameData.backgroundImage,
                gameData.rating,
                gameData.metacritic,
              ),
          );

          this.games.set(mapped);
        },
        error: (err) => {
          console.error('0 games found.', err);
        },
      });
    }
  }

  onSearch(term: string) {
    this.search.set(term);
    this.loadGames();
  }

  deleteGame(gameId: number) {
    this.idBeingDeleted.set(gameId);

    const performDelete = () => {
      this.games.update((currentGames) =>
        currentGames.filter((game) => game.id !== gameId),
      );
      this.idBeingDeleted.set(null);
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => performDelete());
    } else {
      performDelete();
    }
  }
}
