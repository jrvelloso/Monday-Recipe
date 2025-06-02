import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { CommentComponent } from './comment/comment.component';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { LoginComponent } from './login/login.component';
import { MeasurementTypeComponent } from './measurement-type/measurement-type.component';
import { RatingComponent } from './rating/rating.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeCategoryComponent } from './recipecategory/recipecategory.component';
import { RecipeIngredientComponent } from './recipeingredient/recipeingredient.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IngredientsComponent,
    CategoryComponent,
    DifficultyComponent,
    MeasurementTypeComponent,
    CommentComponent,
    FavoriteComponent,
    RatingComponent,
    RecipeCategoryComponent,
    RecipeIngredientComponent,
    RecipeComponent,
      FooterComponent,
      LoginComponent,
      RegisterComponent,
      HeaderComponent
   ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
