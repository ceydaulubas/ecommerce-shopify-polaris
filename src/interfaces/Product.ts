export interface Product {
  id: any;
  name: string;
  description: string;
  category: string;
  tags: string[];
  oldprice: number;
  newprice: number;
  image?: string;

}

export interface Filter {
  name: string;
  description: string;
  tags: string[];
  oldprice: number;
  newprice: number;
  minPrice?: number;
  maxPrice?: number;
}