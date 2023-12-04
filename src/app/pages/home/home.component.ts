import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, interval, takeUntil } from 'rxjs';
import { Joke } from 'src/app/interfaces/joke';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  jokes$: BehaviorSubject<Array<Joke>>;
  destroy$: Subject<boolean>;

  constructor(
    private apiService: ApiService
  ) {
    this.destroy$ = new Subject<boolean>();
    this.jokes$ = this.apiService.jokes$;
  }

  ngOnInit(): void {
    this.apiService.initialJokes();
    interval(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.apiService.getNewJoke();
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  favoriteJoke(joke: Joke): void {
    this.apiService.favoriteJoke(joke);
  }

  isFavorite(joke: Joke): boolean {
    return !!this.apiService.favoriteJokes$.getValue().find(favoriteJoke => favoriteJoke.id === joke.id);
  }
}
