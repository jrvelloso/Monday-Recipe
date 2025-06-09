import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
  excludedUrls: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUrl = this.router.url;
    const user = this.authService.currentUserValue;

    if (currentUrl === "/admin" && user && user.isAdmin === false) {
      console.log('User is not admin, redirecting to home');
      this.router.navigate(['/home']);
      return EMPTY;
    }

    return next.handle(request);
  }
}
