import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        ComponentsModule,
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }