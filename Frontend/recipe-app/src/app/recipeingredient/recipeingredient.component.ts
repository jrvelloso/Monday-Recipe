import { Component, OnInit, Input } from '@angular/core';
import { IRecipeIngredient } from 'src/interfaces/irecipeingredient';
import { RecipeIngredientService } from 'src/services/recipeingredient.service';

@Component({
  selector: 'app-recipeingredient',
  templateUrl: './recipeingredient.component.html',
  styleUrls: ['./recipeingredient.component.css']
})
export class RecipeIngredientComponent implements OnInit {

  @Input() recipeId: number | null = null;
  ingredients: IRecipeIngredient[] = [];

  constructor(private service: RecipeIngredientService) {}

  ngOnInit(): void {
    if (this.recipeId !== null) {
      this.service.getByRecipeId(this.recipeId).subscribe(data => {
        this.ingredients = data;
      });
    }
  }
}
