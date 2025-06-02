import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CommentComponent } from './comment/comment.component';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { LoginComponent } from './login/login.component';
import { MeasurementTypeComponent } from './measurement-type/measurement-type.component';
import { RatingComponent } from './rating/rating.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeCategoryComponent } from './recipecategory/recipecategory.component';
import { RecipeIngredientComponent } from './recipeingredient/recipeingredient.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const Home = "home";

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'home', component: HomeComponent },
   { path: 'ingredients', component: IngredientsComponent },
   { path: 'rating', component: RatingComponent },
   { path: 'category', component: CategoryComponent },
   { path: 'difficulty', component: DifficultyComponent },
   { path: 'comment', component: CommentComponent },
   { path: 'favorite', component: FavoriteComponent },
   { path: 'measurementtype', component: MeasurementTypeComponent },
   { path: 'recipecategory', component: RecipeCategoryComponent },
   { path: 'recipeingredient', component: RecipeIngredientComponent },
   { path: 'recipe', component: RecipeComponent },
   { path: 'user', component: UserComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
