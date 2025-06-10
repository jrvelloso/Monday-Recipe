import { DifficultyService } from './../../services/difficulty.service';
import { UserService } from './../../services/user.service';
import { RecipeIngredientService } from './../../services/recipeingredient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from 'src/interfaces/irecipe';
import { IRecipeIngredient } from 'src/interfaces/irecipeingredient';
import { RecipeService } from 'src/services/recipe.service';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {


  recipeId!: number;
  recipe!: IRecipe;
  ingredients: IRecipeIngredient[] = [];


  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private recipeIngredientService: RecipeIngredientService,
    private userService: UserService,
    private categoryService: CategoryService,
    private difficultyService: DifficultyService,
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Route params:', params);
      this.recipeId = +params['id']; // '+' converts string to number
      this.getRecipeById();
    });
  }

  getRecipeById(): void {
    console.log('Fetching recipe with ID:', this.recipeId);
    this.recipeService.getById(this.recipeId).subscribe((data: IRecipe) => {
      console.log('Fetched recipesddddd:', data);
      this.recipe = data;
      this.recipeIngredientService.getByRecipeId(this.recipeId).subscribe(data => {
        this.ingredients = data;
        console.log('Fetched ingridients:', data);
      });
      this.userService.getById(this.recipe.userId).subscribe(data => {
        this.recipe.user = data;
      });
      this.categoryService.getCategoryById(this.recipe.categoryId).subscribe(data => {
        this.recipe.category = data;
      });
      this.difficultyService.getById(this.recipe.difficultyId).subscribe(data => {
        this.recipe.difficulty = data;
      });
    });
  }
}
