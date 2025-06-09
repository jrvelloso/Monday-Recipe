import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { IUser } from 'src/interfaces/iuser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  currentUser: IUser | null = null;
  showDropdown: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
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
  }

  onSelectChange(event: Event) {
    const route = (event.target as HTMLSelectElement).value;

    console.log('Navigating to:', route);
    this.router.navigate(['/' + route]);
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
