import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Joke } from 'src/app/interfaces/joke';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() public joke: Joke;
  @Input() public isFavorite: boolean = false;
  @Output() public favoriteJoke: EventEmitter<Joke> = new EventEmitter<Joke>();
  constructor() { }
  favorite(): void {
    this.favoriteJoke.emit(this.joke);
  }
}
