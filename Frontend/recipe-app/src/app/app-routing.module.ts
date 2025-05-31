import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { MeasurementTypeComponent } from './measurement-type/measurement-type.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'home', component: HomeComponent },
   { path: 'ingredients', component: IngredientsComponent },
   { path: 'category', component: CategoryComponent },
   { path: 'difficulty', component: DifficultyComponent },
   { path: 'measurementtype', component: MeasurementTypeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
