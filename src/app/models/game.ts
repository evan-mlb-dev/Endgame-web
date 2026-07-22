export class Game {
  public id: number;
  public name: string;
  public released: string;
  public backgroundImage: string;
  public rating: number;
  public metacritic?: number;

  public releasedYear: string;

  constructor(
    id: number,
    name: string,
    released: string,
    backgroundImage: string,
    rating: number,
    metacritic?: number
  ) {
    this.id = id;
    this.name = name;
    this.released = released;
    this.backgroundImage = backgroundImage;
    this.rating = rating;
    this.metacritic = metacritic;
    this.releasedYear = this.getReleasedYear(released);
  }

  private getReleasedYear(dateStr: string): string {
    if (!dateStr) return 'TBA';
    const year = dateStr.split('-')[0];
    return year.length === 4 ? year : 'N/A';
  }
}
