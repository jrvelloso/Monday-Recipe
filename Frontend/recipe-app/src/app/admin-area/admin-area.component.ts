import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';
import { CategoryService } from 'src/services/category.service';
import { IngredientsService } from 'src/services/ingredients.service';
import { DifficultyService } from 'src/services/difficulty.service';
import { MeasurementTypeService } from 'src/services/measurement-type.service';
import { IRecipe } from 'src/interfaces/irecipe';
import { IIngredients } from 'src/interfaces/iingredients';
import { ICategory } from 'src/interfaces/icategory';
import { IDifficulty } from 'src/interfaces/idifficulty';
import { IMeasurementType } from 'src/interfaces/imeasurementType';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {
  pendingRecipes: IRecipe[] = [];

  categories: ICategory[] = [];
  newCategoryName: string = '';

  ingredients: IIngredients[] = [];
  newIngredientName: string = '';

  difficulties: IDifficulty[] = [];
  newDifficultyName: string = '';

  measurementTypes: IMeasurementType[] = [];
  newMeasurementTypeName: string = '';

  constructor(
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    private ingredientsService: IngredientsService,
    private difficultyService: DifficultyService,
    private measurementTypeService: MeasurementTypeService
  ) {}

  ngOnInit(): void {
    this.loadPendingRecipes();
    this.loadCategories();
    this.loadIngredients();
    this.loadDifficulties();
    this.loadMeasurementTypes();
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

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  addCategory() {
    if (!this.newCategoryName.trim()) return;
    this.categoryService.createCategory({
      name: this.newCategoryName,
      id: 0,
      isActive: true
    }).subscribe(() => {
      this.newCategoryName = '';
      this.loadCategories();
    });
  }

  editCategory(category: any) {
    const newName = prompt('Editar Categoria', category.name);
    if (newName && newName.trim()) {
      this.categoryService.updateCategory(category.id, { ...category, name: newName }).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }

  loadIngredients() {
    this.ingredientsService.getAll().subscribe(data => {
      this.ingredients = data;
    });
  }

  addIngredient() {
    if (!this.newIngredientName.trim()) return;
    this.ingredientsService.create({
      name: this.newIngredientName,
      id: 0,
      isActive: true
    }).subscribe(() => {
      this.newIngredientName = '';
      this.loadIngredients();
    });
  }

  editIngredient(ingredient: any) {
    const newName = prompt('Editar Ingrediente', ingredient.name);
    if (newName && newName.trim()) {
      this.ingredientsService.update(ingredient.id, { ...ingredient, name: newName }).subscribe(() => {
        this.loadIngredients();
      });
    }
  }

  deleteIngredient(id: number) {
    this.ingredientsService.delete(id).subscribe(() => {
      this.loadIngredients();
    });
  }

  loadDifficulties() {
    this.difficultyService.getAll().subscribe(data => {
      this.difficulties = data;
    });
  }

  addDifficulty() {
    if (!this.newDifficultyName.trim()) return;
    this.difficultyService.create({
      name: this.newDifficultyName,
      id: 0,
      isActive: true
    }).subscribe(() => {
      this.newDifficultyName = '';
      this.loadDifficulties();
    });
  }

  editDifficulty(difficulty: any) {
    const newName = prompt('Editar Dificuldade', difficulty.name);
    if (newName && newName.trim()) {
      this.difficultyService.update(difficulty.id, { ...difficulty, name: newName }).subscribe(() => {
        this.loadDifficulties();
      });
    }
  }

  deleteDifficulty(id: number) {
    this.difficultyService.delete(id).subscribe(() => {
      this.loadDifficulties();
    });
  }

  loadMeasurementTypes() {
    this.measurementTypeService.getAll().subscribe(data => {
      this.measurementTypes = data;
    });
  }

  addMeasurementType() {
    if (!this.newMeasurementTypeName.trim()) return;
    this.measurementTypeService.create({
      measurement: this.newMeasurementTypeName,
      id: 0,
      isActive: true
    }).subscribe(() => {
      this.newMeasurementTypeName = '';
      this.loadMeasurementTypes();
    });
  }

  editMeasurementType(measurementType: any) {
    const newName = prompt('Editar Tipo de Medida', measurementType.measurement);
    if (newName && newName.trim()) {
      this.measurementTypeService.update(measurementType.id, { ...measurementType, measurement: newName }).subscribe(() => {
        this.loadMeasurementTypes();
      });
    }
  }

  deleteMeasurementType(id: number) {
    this.measurementTypeService.delete(id).subscribe(() => {
      this.loadMeasurementTypes();
    });
  }
}
