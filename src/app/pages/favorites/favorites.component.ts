import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Joke } from 'src/app/interfaces/joke';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  jokes$: BehaviorSubject<Array<Joke>>;
  constructor(
    private apiService: ApiService
  ) {
    this.jokes$ = this.apiService.favoriteJokes$;
  }
  favoriteJoke(joke: Joke): void {
    this.apiService.favoriteJoke(joke);
  }

  isFavorite(joke: Joke): boolean {
    return !!this.apiService.favoriteJokes$.getValue().find(favoriteJoke => favoriteJoke.id === joke.id);
  }
}
