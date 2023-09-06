import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BasePageComponent } from './base-page.component';

describe('BasePageComponent', () => {
  let component: BasePageComponent;
  let fixture: ComponentFixture<BasePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BasePageComponent]
    });
    fixture = TestBed.createComponent(BasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`favoriteJoke should call apiService.favoriteJoke`, () => {
    spyOn(component.apiService, 'favoriteJoke');
    component.favoriteJoke({} as any);
    expect(component.apiService.favoriteJoke).toHaveBeenCalled();
  });

  it(`isFavorite should return true if joke is in favoriteJokes$`, () => {
    component.apiService.favoriteJokes$.next([{id: '1'} as any]);
    expect(component.isFavorite({id: '1'} as any)).toBe(true);
  });
});
