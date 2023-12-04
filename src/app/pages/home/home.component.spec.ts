import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should run initialJokes onInit`, () => {
    spyOn(component['apiService'], 'initialJokes');
    component.ngOnInit();
    expect(component['apiService'].initialJokes).toHaveBeenCalled();
  });
  it(`should run getNewJoke every 5 seconds`, () => {
    jasmine.clock().install();
    spyOn(component['apiService'], 'getNewJoke');
    component.ngOnInit();
    expect(component['apiService'].getNewJoke).not.toHaveBeenCalled();
    jasmine.clock().tick(5000);
    expect(component['apiService'].getNewJoke).toHaveBeenCalled();
  });
  it(`should unsubscribe on destroy`, () => {
    spyOn(component.destroy$, 'next');
    spyOn(component.destroy$, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.unsubscribe).toHaveBeenCalled();
  });
});
