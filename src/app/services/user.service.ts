import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Address,
  AddressResponse,
  CreateAccount,
  LoginResponse,
  UpdateUserDto,
  UserAdminUpdateDto,
  UserResponse,
} from '../types/user.type';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { SecretsService } from './secrets.service';

import { ApiResponse } from '../types/base.type';
import { LocalStorageService } from './localstorage.service';
import { environment } from '../../environments/environment';

export const SKIP_AUTH_CONTEXT = new HttpContextToken<boolean>(() => false);

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private secretsService: SecretsService,
    private localStorageService: LocalStorageService
  ) {}

  loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password!);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    let context = new HttpContext();
    context.set(SKIP_AUTH_CONTEXT, true);
    return this.http.post<LoginResponse>(
      this.secretsService.getUsersUrl() + '/login',
      body.toString(),
      { headers, context }
    );
  }

  createUserAccount(data: CreateAccount): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.secretsService.getUsersUrl(), {
      ...data,
    });
  }
  createAddress(data: Address, userId: number): Observable<AddressResponse> {
    return this.http.post<AddressResponse>(
      this.secretsService.getAddressUrl(),
      {
        ...data,
        userId: userId,
      }
    );
  }

  updateAccount(data: UpdateUserDto, userId: number): Observable<UserResponse> {
    return this.http.patch<UserResponse>(
      this.secretsService.getUsersUrl(userId),
      {
        ...data,
      }
    );
  }

  updateUserAdmin(
    data: UserAdminUpdateDto,
    userId: number
  ): Observable<UserResponse> {
    const { id, ...info } = data;
    const url = `${this.secretsService.getUsersUrl()}/admin/${id}`;
    return this.http.patch<UserResponse>(url, info);
  }

  updatePassword(
    { password }: { password: string },
    userId: number
  ): Observable<UserResponse> {
    const url = `${this.secretsService.getBaseUrl()}/users/password/${userId}`;
    return this.http.patch<UserResponse>(url, {
      password,
    });
  }
  deleteAccount(userId: number): Observable<ApiResponse<object>> {
    return this.http.delete<ApiResponse<object>>(
      this.secretsService.getUsersUrl(userId)
    );
  }

  getUserAccount(userId: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.secretsService.getUsersUrl(userId));
  }

  refreshToken(): Observable<LoginResponse> {
    const context = new HttpContext().set(SKIP_AUTH_CONTEXT, true);

    const refresh_token = this.localStorageService.getAuth(
      environment.LIBERTA_AUTH_KEY
    )?.data?.refresh_token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${refresh_token}`,
    });

    return this.http.get<LoginResponse>(
      this.secretsService.getUsersUrl(undefined, true),
      { headers, context }
    );
  }
}
