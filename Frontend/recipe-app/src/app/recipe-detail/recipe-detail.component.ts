import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from 'src/interfaces/irecipe';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {


  recipeId!: number;
  recipe!: IRecipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
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
    });
  }

}
