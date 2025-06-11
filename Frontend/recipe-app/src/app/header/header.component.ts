import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { IUser } from 'src/interfaces/iuser';
import { CategoryService } from 'src/services/category.service';
import { CategorySelectionService } from 'src/services/category-selection.service';
import { SearchService } from 'src/services/search.service';
import { ICategory } from 'src/interfaces/icategory';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  currentUser: IUser | null = null;
  showDropdown: boolean = false;
  categories: ICategory[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private categoryService: CategoryService,
    private categorySelectionService: CategorySelectionService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: ICategory[]) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onLoginClick() {
    this.router.navigate(['/auth']);
  }

  onSearchChange(query: string) {
    this.searchQuery = query.toLowerCase();
    this.searchService.setSearchQuery(this.searchQuery);
  }

  onSelectChange(event: Event) {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    this.selectedCategoryId = selectedId;
    const selectedCategory = this.categories.find(cat => cat.id === selectedId) || null;
    this.categorySelectionService.selectCategory(selectedCategory);
  }

  navigateTo(path: string) {
    this.showDropdown = false;
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onUserMenuChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'logout') {
      this.logout();
    } else {
      this.navigateTo(value);
    }
  }
}
