import { ApiResponse } from "./base.type";
import { Product } from "./product.type";

export enum CategoryName {
  ELECTRONICS = "ELECTRONICS",
  MOVIES = "MOVIES",
  ADULTS = "ADULTS",
  FOOD = "FOOD",
  
  // New categories
  FASHION = "FASHION",
  BOOKS = "BOOKS",
  TOYS = "TOYS",
  BEAUTY = "BEAUTY",
  SPORTS = "SPORTS",
  AUTOMOTIVE = "AUTOMOTIVE",
  HOME = "HOME",
  GARDEN = "GARDEN",
  PETS = "PETS",
  MUSIC = "MUSIC",
  HEALTH = "HEALTH",
  GAMES = "GAMES",
  SOFTWARE = "SOFTWARE",
  BABY = "BABY",
  OFFICE = "OFFICE",
  JEWELRY = "JEWELRY",
}

// Category model
export type Category = {
  id?:number
  name: string;
};


export type CategoryResponse = ApiResponse<MultipleCategoryResponse[]>;

export type MultipleCategoryResponse = {
  id: number;
  name: string;
  products: Product[];
};

export type SingleCategoryResponse =  ApiResponse<MultipleCategoryResponse>

