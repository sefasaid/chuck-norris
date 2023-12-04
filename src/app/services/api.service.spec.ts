import { TestBed, async, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { Joke } from '../interfaces/joke';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  let localStore: { [x: string]: string; };
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStore = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get empty value from localstora', () => {
    expect(window.localStorage.getItem('favoriteJokes')).toBeNull();
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

    // it should set to localstorage so that means localstorage should equal to favoriteJokes
    const localJokes = JSON.parse(window.localStorage.getItem('favoriteJokes') as string);
    expect(localJokes).toEqual(service.favoriteJokes$.getValue());

    service.favoriteJoke(joke);
    expect(service.favoriteJokes$.getValue().length).toEqual(0);
    // ehe localstorage is empty now because there shouldn't be any favorite joke
    expect(window.localStorage.getItem('favoriteJokes')).toEqual('[]');
  });

});
