import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FavoritesRoutingModule,
        ComponentsModule,
    ],
    declarations: [FavoritesComponent]
})
export class FavoritesModule { }