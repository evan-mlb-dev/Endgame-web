export class Game {
  public id!: number;
  public name!: string;
  public released!: string;
  public backgroundImage!: string;
  public rating!: number;
  public metacritic?: number;

  constructor(init?: Partial<Game>) {
    if (init) {
      Object.assign(this, init);
    }
  }

  public get releasedYear(): string {
    if (!this.released) return 'TBA';
    const year = this.released.split('-')[0];
    return year.length === 4 ? year : 'N/A';
  }
}
