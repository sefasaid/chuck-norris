import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.joke = {
      categories: [],
      created_at: 'string',
      icon_url: 'string',
      id: 'string',
      updated_at: 'string',
      url: 'string',
      value: 'test',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a joke input`, () => {
    var span = fixture.nativeElement.querySelector('span');
    // Test elements that depend on the input
    expect(span.innerText).toEqual('test');
  });
  it(`should have a non-favorite button`, () => {
    var button = fixture.nativeElement.querySelector('[data-test="non-favorite"]');
    // Test elements that depend on the input
    expect(button).toBeTruthy();
  });
  it(`should have a favorite button`, () => {
    component.isFavorite = true;
    fixture.detectChanges();
    var button = fixture.nativeElement.querySelector('[data-test="favorite"]');
    // Test elements that depend on the input
    expect(button).toBeTruthy();
  });
  it(`should emit a favorite event`, () => {
    spyOn(component.favoriteJoke, 'emit');
    var button = fixture.nativeElement.querySelector('.card-icon');
    button.click();
    expect(component.favoriteJoke.emit).toHaveBeenCalled();
  });
  it(`should emit a favorite event when favorite method called`, () => {
    spyOn(component.favoriteJoke, 'emit');
    component.favorite();
    expect(component.favoriteJoke.emit).toHaveBeenCalled();
  })
});
