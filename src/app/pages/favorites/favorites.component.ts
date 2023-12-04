import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasePageComponent } from 'src/app/components/base-page/base-page.component';
import { Joke } from 'src/app/interfaces/joke';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent extends BasePageComponent {
  jokes$: BehaviorSubject<Array<Joke>>;
  constructor(
    apiService: ApiService
  ) {
    super(apiService);
    this.jokes$ = this.apiService.favoriteJokes$;
  }

}
