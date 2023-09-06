import { Component } from '@angular/core';
import { Joke } from 'src/app/interfaces/joke';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-base-page',
  template: '',
})
export class BasePageComponent {

  constructor(
    public apiService: ApiService
  ) { }

  favoriteJoke(joke: Joke): void {
    this.apiService.favoriteJoke(joke);
  }

  isFavorite(joke: Joke): boolean {
    return this.apiService.favoriteJokes$.getValue().find(favoriteJoke => favoriteJoke.id === joke.id) ? true : false;
  }
}
