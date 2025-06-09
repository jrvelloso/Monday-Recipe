import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { RecipeService } from 'src/services/recipe.service';
import { IUser } from 'src/interfaces/iuser';
import { IRecipe } from 'src/interfaces/irecipe';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  currentUser: IUser | null = null;
  favoriteRecipes: IRecipe[] = [];

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser && this.currentUser.favourites) {
      this.loadFavoriteRecipes(this.currentUser.favourites);
    }
  }

  loadFavoriteRecipes(favoriteIds: number[]) {
    this.favoriteRecipes = [];
    favoriteIds.forEach(id => {
      this.recipeService.getById(id).subscribe(recipe => {
        if (recipe) {
          this.favoriteRecipes.push(recipe);
        }
      });
    });
  }
}
