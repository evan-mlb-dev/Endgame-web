import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss',
  standalone: true
})
export class Searchbar {
  @Output() searchChange = new EventEmitter<string>();
  private timeoutId: any;

  /*Debounce Input Change*/

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.searchChange.emit(value);
    }, 400);
  }
}
