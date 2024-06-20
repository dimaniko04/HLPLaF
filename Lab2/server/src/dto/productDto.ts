import { Product } from "../entities/product";

export class ProductDto {
  id: number;
  img: string;
  name: string;
  price: number;
  isFavorite: Boolean;

  constructor(model: Product & { isFavorite: Boolean }) {
    this.id = model.id;
    this.img = model.img;
    this.name = model.name;
    this.price = model.price;
    this.isFavorite = model.isFavorite;
  }
}
