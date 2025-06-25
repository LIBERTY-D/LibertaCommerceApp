import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { LocalStorageService } from './localstorage.service';
import { environment } from '../../environments/environment';

export interface DecodedToken {
  sub: string;
  id: number;
  email?: string;
  exp?: number;
  iat?: number;
  roles?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = environment.LIBERTA_AUTH_KEY;

  constructor(private localStorageService: LocalStorageService) {}

  getToken(): string | undefined {
    return this.localStorageService.getAuth(this.TOKEN_KEY)?.data.access_token;
  }

  decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode.jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  getUserId(): string | null {
    const decoded = this.decodeToken();
    return decoded?.sub ?? null;
  }

  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded?.exp) return true;

    const now = Date.now() / 1000;
    return decoded.exp < now;
  }

  clearToken(): void {
    this.localStorageService.clearStorage(this.TOKEN_KEY);
  }
}
