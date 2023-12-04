import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Joke } from '../interfaces/joke';
import { BehaviorSubject, EMPTY, Observable, lastValueFrom, map, repeat, switchMap, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'https://api.chucknorris.io/jokes';

  jokes$: BehaviorSubject<Array<Joke>>;

  favoriteJokes$: BehaviorSubject<Array<Joke>>;
  constructor(private httpClient: HttpClient) {
    this.jokes$ = new BehaviorSubject<Array<Joke>>([]);
    this.favoriteJokes$ = new BehaviorSubject<Array<Joke>>([]);
    // get the favorite jokes from the local storage
    // I could use session or local storage, but I think local storage is easy and fast to use
    const favoriteJokes = localStorage.getItem('favoriteJokes');
    if (favoriteJokes) {
      this.favoriteJokes$.next(JSON.parse(favoriteJokes));
    }
  }

  getRandomJoke(): Observable<Joke> {
    return this.httpClient.get<Joke>(`${this.apiURL}/random`)
  }

  async initialJokes() {
    while (this.jokes$.getValue().length < 10) {
      const nextJoke = await lastValueFrom(this.getRandomJoke());
      // if the joke is already in the array, continue
      if (this.jokes$.getValue().find(joke => joke.id === nextJoke.id)) continue;
      // add the new joke to the array
      this.jokes$.next([...this.jokes$.getValue(), nextJoke]);
    }
  }

  getNewJoke(): Observable<Joke> {
    return this.getRandomJoke()
      .pipe(
        map((nextJoke: Joke) => {
          if (this.jokes$.getValue().find(joke => joke.id === nextJoke.id)) return false;
          // remove the oldest joke if the array is bigger than 10
          if (this.jokes$.getValue().length >= 10) {
            this.jokes$.next(this.jokes$.getValue().slice(0, -1));
          }
          this.jokes$.next([nextJoke, ...this.jokes$.getValue()]);
          return true;
        }),
        switchMap((fetched: boolean) => {
          return fetched ? EMPTY : this.getNewJoke();
        })
      );
  }

  favoriteJoke(joke: Joke): void {
    // if the joke is already in the array, remove it
    if (this.favoriteJokes$.getValue().find(favoriteJoke => favoriteJoke.id === joke.id)) {
      this.favoriteJokes$.next(this.favoriteJokes$.getValue().filter(favoriteJoke => favoriteJoke.id !== joke.id));
    } else {
      if (this.favoriteJokes$.getValue().length >= 10) {
        this.favoriteJokes$.next(this.favoriteJokes$.getValue().slice(0, -1));
      }
      // add the joke to the array
      this.favoriteJokes$.next([joke, ...this.favoriteJokes$.getValue()]);
    }
    localStorage.setItem('favoriteJokes', JSON.stringify(this.favoriteJokes$.getValue()));
  }

}
