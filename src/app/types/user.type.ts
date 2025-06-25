
import { ApiResponse } from "./base.type";
import { Order } from "./order.type";
import { PurchasedProduct } from "./product.type";

//  Auth/Login response
export type LoginResponse = ApiResponse<{
  access_token: string;
  refresh_token: string;
}>;

// User data response
export type UserResponse = ApiResponse<User>;

// User model
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  isNonLocked: boolean;
  roles: string[];
  address: Address;
  createdAt: string;
  updatedAt: string;
  orders: Order[];
};

// Address model
export type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type AddressResponse = ApiResponse<Address>;




export type CreateAccount = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

export type UpdateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
};

export type UpdatePsswordDto = {
  password: string;
  confirmPassword: string;
};



export type  UserAdminUpdateDto={
    id: number,
    firstName:string,
    lastName:string,
    email: string,
    password: string,
    role: Role,
    enabled: boolean,
    nonLocked: boolean,
  
}

export enum Role{
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_MANAGER = 'ROLE_MANAGER',
  ROLE_DEV = 'ROLE_DEV',
  ROLE_QA = 'ROLE_QA'
}



