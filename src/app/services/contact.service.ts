import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../types/contact.type';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/base.type';
import { SecretsService } from './secrets.service';
import { SKIP_AUTH_CONTEXT } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private http: HttpClient,
    private secretsService: SecretsService
  ) {}

  contactUs(contact: Contact): Observable<ApiResponse<object>> {
    let context = new HttpContext().set(SKIP_AUTH_CONTEXT, true);
    return this.http.post<ApiResponse<object>>(
      this.secretsService.getContactUrl(),
      {
        ...contact,
      },
      { context }
    );
  }
}
