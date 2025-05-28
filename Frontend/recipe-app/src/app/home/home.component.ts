import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../services/category.service';

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
      title: 'Spaghetti Carbonara',
      image: 'assets/images/carbonara.jpg',
      description: 'Creamy and savory Roman classic with pancetta.',
    },
    {
      title: 'Avocado Toast',
      image: 'assets/images/avocado-toast.jpg',
      description: 'Simple, healthy, and perfect for breakfast.',
    },
    {
      title: 'Chicken Tikka Masala',
      image: 'assets/images/tikka.jpg',
      description: 'Rich and flavorful Indian-inspired curry dish.',
    },
  ];

}
