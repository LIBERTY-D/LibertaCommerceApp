import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Category,
  CategoryResponse,
  SingleCategoryResponse,
} from '../types/category.type';
import { HttpClient } from '@angular/common/http';
import { SecretsService } from './secrets.service';
import { ApiResponse } from '../types/base.type';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private secretsService: SecretsService
  ) {}

  updateCategory(data: Category) {
    return this.http.patch<SingleCategoryResponse>(
      this.secretsService.getCateroriesUrl(data.id),
      {
        categoryName: data.name,
      }
    );
  }

  createCategory(data: Category): Observable<SingleCategoryResponse> {
    return this.http.post<SingleCategoryResponse>(
      this.secretsService.getCateroriesUrl(),
      {
        categoryName: data.name,
      }
    );
  }

  deleteCategory(categoryId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(
      this.secretsService.getCateroriesUrl(categoryId)
    );
  }

  getAllCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(
      this.secretsService.getCateroriesUrl()
    );
  }

  getCategory(categoryId: number): Observable<SingleCategoryResponse> {
    return this.http.get<SingleCategoryResponse>(
      this.secretsService.getCateroriesUrl(categoryId)
    );
  }
}
