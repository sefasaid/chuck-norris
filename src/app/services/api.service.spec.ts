import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { Joke } from '../interfaces/joke';
import { Observable, of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have a run http call with getRandomJoke', () => {
    service.getRandomJoke().subscribe();
    const req = httpTestingController.expectOne(`${service.apiURL}/random`);
    expect(req.request.method).toEqual('GET');
  });

  it('should run initialJokes', async () => {
    const spy = spyOn(service, 'getRandomJoke').and.callFake(() => of({
      id: Math.floor(Math.random() * 10000).toString(),
      categories: [],
      created_at: 'string',
      icon_url: 'string',
      updated_at: 'string',
      url: 'string',
      value: 'string',
    } as Joke));
    await service.initialJokes();
    expect(spy).toHaveBeenCalledTimes(10);
  });

  it('should run getNewJoke', async () => {
    const spy = spyOn(service, 'getRandomJoke').and.callFake(() => of(
      {
        id: Math.floor(Math.random() * 10000).toString(),
        categories: [],
        created_at: 'string',
        icon_url: 'string',
        updated_at: 'string',
        url: 'string',
        value: 'string',
      } as Joke
    ));
    await service.getNewJoke();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should run favoriteJoke', () => {
    const joke = {
      id: Math.floor(Math.random() * 10000).toString(),
      categories: [],
      created_at: 'string',
      icon_url: 'string',
      updated_at: 'string',
      url: 'string',
      value: 'string',
    } as Joke;
    service.favoriteJoke(joke);
    expect(service.favoriteJokes$.getValue().length).toEqual(1);
    service.favoriteJoke(joke);
    expect(service.favoriteJokes$.getValue().length).toEqual(0);
  });

});
