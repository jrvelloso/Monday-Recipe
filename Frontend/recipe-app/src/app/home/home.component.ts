import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/services/recipe.service';
import { IRecipe } from 'src/interfaces/irecipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  recipes: IRecipe[] = [];

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getAll().subscribe({
      next: (data: IRecipe[]) => {
        this.recipes = data;
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
      }
    });
  }

  get filteredRecipes() {
    if (!this.searchQuery) {
      return this.recipes;
    }
    return this.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      recipe.category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onRecipeClick(recipeId: number): void {
    this.router.navigate(['/recipe-detail', recipeId]);
  }
}
