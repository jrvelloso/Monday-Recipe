import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_BASE_HREF, NgTemplateOutlet } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app/app-routing.module';
import { AppComponent } from '../app/app.component';
import { HomeComponent } from '../app/home/home.component';
import { IngredientsComponent } from '../app/ingredients/ingredients.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IngredientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgTemplateOutlet
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
