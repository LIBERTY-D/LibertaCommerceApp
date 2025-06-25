import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token-service.service';
import { User } from '../types/user.type';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.loadUserFromToken();
  }

  public loadUserFromToken(): Promise<void> {
    const decoded = this.tokenService.decodeToken();
    if (!decoded?.sub) {
      this.currentUserSubject.next(null);
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.userService.getUserAccount(Number(decoded.id)).subscribe({
        next: (user) => {
          this.currentUserSubject.next(user.data);
          resolve();
        },
        error: () => {
          this.currentUserSubject.next(null);
          resolve();
        },
      });
    });
  }

  refreshUserFromToken(): void {
    this.loadUserFromToken();
  }

  updateUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.tokenService.clearToken();
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
