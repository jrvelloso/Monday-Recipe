import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/services/recipe.service';
import { IRecipe } from 'src/interfaces/irecipe';
import { CategorySelectionService } from 'src/services/category-selection.service';
import { SearchService } from 'src/services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  recipes: IRecipe[] = [];
  filteredRecipesList: IRecipe[] = [];
  selectedCategoryId: number | null = null;
  currentCategoryName: string = 'Receitas';
  private categorySubscription!: Subscription;
  private searchSubscription!: Subscription;
  private searchQuery: string = '';

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private categorySelectionService: CategorySelectionService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.loadRecipes();
    this.categorySubscription = this.categorySelectionService.selectedCategory$.subscribe(category => {
      this.selectedCategoryId = category ? category.id : null;
      this.currentCategoryName = category ? category.name : 'Receitas';
      this.applyFilters();
    });
    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.applyFilters();
    });
  }

  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadRecipes(): void {
    this.recipeService.getAll().subscribe({
      next: (data: IRecipe[]) => {
        this.recipes = data;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredRecipesList = this.recipes.filter(recipe => {
      const matchesSearch = !this.searchQuery || recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || recipe.category.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = !this.selectedCategoryId || recipe.category.id === this.selectedCategoryId;
      return matchesSearch && matchesCategory;
    });
  }

  get filteredRecipes() {
    return this.filteredRecipesList;
  }

  onRecipeClick(recipeId: number): void {
    this.router.navigate(['/recipe-detail', recipeId]);
  }
}
