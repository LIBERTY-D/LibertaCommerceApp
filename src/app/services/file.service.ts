import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecretsService } from './secrets.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/base.type';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpClient, private secretes: SecretsService) {}

  getFile(fileId: number): Observable<Blob> {
    return this.http.get(`${this.secretes.getFilesUrl(fileId)}`, {
      responseType: 'blob',
    });
  }

  uploadFile(file: File, productId: number): Observable<ApiResponse<null>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('productId', productId.toString());
    return this.http.post<ApiResponse<null>>(
      this.secretes.getFilesUrl(undefined, true),
      formData
    );
  }
}
