import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';
import { IRecipe } from 'src/interfaces/irecipe';


@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {
  pendingRecipes: IRecipe[] = [];

  constructor(
    private recipeService: RecipeService,

  ) {}

  ngOnInit(): void {
    this.loadPendingRecipes();
  }

  loadPendingRecipes() {
    this.recipeService.getAll().subscribe(recipes => {
      this.pendingRecipes = recipes.filter(r => r.status === "Pending");
    });
  }

  updateRecipeStatus(recipe: IRecipe, status: string) {
    recipe.isActive = (status === 'Approved');
    this.recipeService.update(recipe.id, recipe).subscribe(() => {
      this.loadPendingRecipes();
    });
  }
}
