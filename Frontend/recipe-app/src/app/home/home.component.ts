import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  recipes = [
    {
      title: 'Mil-folhas de Bacalhau com Couve e Batata',
      image: 'assets/images/bacalhau.jpg',
      category: 'Peixe e Marisco',
      author: 'Cátia Goarmon'
    },
    {
      title: 'Doce com Frutos Vermelhos e Suspiros',
      image: 'assets/images/frutos-vermelhos.jpg',
      category: 'Sobremesas',
      author: 'Cátia Goarmon'
    },
    {
      title: 'Mekitsi',
      image: 'assets/images/mekitsi.jpg',
      category: 'Sobremesas',
      author: 'Cátia Goarmon'
    },
    {
      title: 'Tarte de Pêra Caramelizada',
      image: 'assets/images/receitasdefault.jpg',
      category: 'Sobremesas',
      author: 'Cátia Goarmon'
    }
  ];

  searchQuery: string = '';

  onSearchChange(query: string) {
    this.searchQuery = query.toLowerCase();
  }

  get filteredRecipes() {
    if (!this.searchQuery) {
      return this.recipes;
    }
    return this.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(this.searchQuery) ||
      recipe.category.toLowerCase().includes(this.searchQuery)
    );
  }

  onLoginClick() {
    alert('Login/Register clicked');
  }

}
