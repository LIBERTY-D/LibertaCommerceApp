import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpContext } from '@angular/common/http';
import { SecretsService } from './secrets.service';
import { ApiResponse } from '../types/base.type';
import {
  CreateProductdDto,
  ProductResponse,
  SingleProductResponse,
} from '../types/product.type';
import { SKIP_AUTH_CONTEXT } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private secretsService: SecretsService
  ) {}

  updateProduct(
    data: CreateProductdDto,
    productId: number
  ): Observable<SingleProductResponse> {
    return this.http.patch<SingleProductResponse>(
      this.secretsService.getProductsUrl(productId),
      {
        ...data,
      }
    );
  }

  createProduct(data: CreateProductdDto): Observable<SingleProductResponse> {
    return this.http.post<SingleProductResponse>(
      this.secretsService.getProductsUrl(),
      {
        ...data,
      }
    );
  }

  deleteProduct(productId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(
      this.secretsService.getProductsUrl(productId)
    );
  }

  getAllProducts(): Observable<ProductResponse> {
    let context = new HttpContext();
    context.set(SKIP_AUTH_CONTEXT, true);
    return this.http.get<ProductResponse>(
      this.secretsService.getProductsUrl(),
      {
        context,
      }
    );
  }

  getProduct(productId: number): Observable<SingleProductResponse> {
    return this.http.get<SingleProductResponse>(
      this.secretsService.getProductsUrl(productId)
    );
  }
}
