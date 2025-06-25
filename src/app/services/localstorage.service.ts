import { Injectable } from '@angular/core';

import { LoginResponse } from '../types/user.type';
import { Product } from '../types/product.type';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setProductsStorage(key: string, data: Product[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getProductsStorage(key: string): Product[] | null {
    let items = localStorage.getItem(key);
    if (items) {
      return JSON.parse(items);
    }
    return null;
  }
  setAuth(key: string, data: LoginResponse) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getAuth(key: string): LoginResponse | null {
    let items = localStorage.getItem(key);
    if (items) {
      return JSON.parse(items);
    }
    return null;
  }

  clearStorage(key: string) {
    localStorage.removeItem(key);
  }
}
