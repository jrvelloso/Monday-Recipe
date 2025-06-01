import { IMeasurementType } from './imeasurementType';
import { IIngredients } from './iingredients';
import { IRecipe } from './irecipe';


export interface IRecipeIngredient {
  id: number;
  isActive: boolean;
  amount: number;
  measurementTypeId: number;
  ingredientId: number;
  recipeId: number;
  measurementType: IMeasurementType;
  ingredient: IIngredients;
  recipe: IRecipe;
}
