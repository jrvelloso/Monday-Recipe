import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser | null>;
  public currentUser: Observable<IUser | null>;

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<IUser | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser | null {
    return this.currentUserSubject.value;
  }

  login(user: IUser) {
    // Store user details and notify subscribers
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    // Remove user from local storage and notify subscribers
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    const user = this.currentUserValue;
    return user ? user.isAdmin : false;
  }
}
