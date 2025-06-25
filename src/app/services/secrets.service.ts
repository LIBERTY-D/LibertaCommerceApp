import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecretsService {
  constructor() {}

  getBaseUrl() {
    return environment.BASE_URL;
  }

  getCateroriesUrl(param?: number) {
    if (param) {
      return this.getBaseUrl() + environment.CATEGORY_URL + '/' + param;
    }
    return this.getBaseUrl() + environment.CATEGORY_URL;
  }

  getAddressUrl(param?: number) {
    if (param) {
      return this.getBaseUrl() + environment.ADDRESS_URL + '/' + param;
    }
    return this.getBaseUrl() + environment.ADDRESS_URL;
  }

  getProductsUrl(param?: number) {
    if (param) {
      return this.getBaseUrl() + environment.PRODUCTS_URL + '/' + param;
    }
    return this.getBaseUrl() + environment.PRODUCTS_URL;
  }

  getOrdersUrl(param?: number) {
    if (param) {
      return this.getBaseUrl() + environment.ORDERS_URL + '/' + param;
    }
    return this.getBaseUrl() + environment.ORDERS_URL;
  }

  getUsersUrl(param?: number, refresh: boolean = false) {
    if (param && !refresh) {
      return this.getBaseUrl() + environment.USER_URL + '/' + param;
    } else if (!param && refresh) {
      return this.getBaseUrl() + environment.USER_URL + '/refresh/token';
    }
    return this.getBaseUrl() + environment.USER_URL;
  }

  getFilesUrl(param?: number, upload?: boolean) {
    if (param) {
      return this.getBaseUrl() + environment.FILE_URL + '/view/' + param;
    }
    if (upload) {
      return this.getBaseUrl() + environment.FILE_URL + '/upload';
    }
    return this.getBaseUrl() + environment.FILE_URL;
  }
  getContactUrl() {
    return this.getBaseUrl() + environment.CONTACT_URL;
  }
}
