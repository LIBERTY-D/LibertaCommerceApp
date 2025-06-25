import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {} from '../types/user.type';
import { HttpClient } from '@angular/common/http';
import { SecretsService } from './secrets.service';
import {
  CreateOrderdDto,
  OrderResponse,
  SingleOrderResponse,
} from '../types/order.type';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private secretsService: SecretsService
  ) {}

  // updateOrder(data: CreateOrderdDto): Observable<SingleOrderResponse> {
  //    return this.http.patch<SingleOrderResponse>(
  //      this.secretsService.getOrdersUrl(),
  //      {
  //        ...data,
  //      }
  //    );
  //  }

  createOrder(data: CreateOrderdDto): Observable<SingleOrderResponse> {
    return this.http.post<SingleOrderResponse>(
      this.secretsService.getOrdersUrl(),
      {
        ...data,
      }
    );
  }

  //  deleteOrder(OrderId: number): Observable<ApiResponse<null>> {
  //    return this.http.delete<ApiResponse<null>>(
  //      this.secretsService.getOrdersUrl(OrderId)
  //    );
  //  }

  getAllOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(this.secretsService.getOrdersUrl());
  }

  getOrder(OrderId: number): Observable<SingleOrderResponse> {
    return this.http.get<SingleOrderResponse>(
      this.secretsService.getOrdersUrl(OrderId)
    );
  }
}
