import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';
import { CategoryService } from 'src/services/category.service';
import { IngredientsService } from 'src/services/ingredients.service';
import { DifficultyService } from 'src/services/difficulty.service';
import { MeasurementTypeService } from 'src/services/measurement-type.service';
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
    private categoryService: CategoryService,
    private ingredientsService: IngredientsService,
    private difficultyService: DifficultyService,
    private measurementTypeService: MeasurementTypeService
  ) {}

  ngOnInit(): void {
    this.loadPendingRecipes();
  }

  loadPendingRecipes() {
    this.recipeService.getAll().subscribe(recipes => {
      this.pendingRecipes = recipes.filter(r => r.isActive === false);
    });
  }

  updateRecipeStatus(recipe: IRecipe, status: string) {
    recipe.isActive = (status === 'Approved');
    this.recipeService.update(recipe.id, recipe).subscribe(() => {
      this.loadPendingRecipes();
    });
  }

  // TODO: Implement CRUD for categories, ingredients, difficulty, measurement types
}
