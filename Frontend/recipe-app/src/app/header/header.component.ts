import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }



  onLoginClick() {
    this.router.navigate(['/auth']);
  }

  onSearchChange(query: string) {
    this.searchQuery = query.toLowerCase();
  }

  onSelectChange(event: Event) {
    const route = (event.target as HTMLSelectElement).value;

    console.log('Navigating to:', route);
    this.router.navigate(['/' + route]);
  }
}
