import { IProductInfo } from "./IProductInfo";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  img: string;
  productInfo: IProductInfo[];
}
