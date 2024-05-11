import { AxiosResponse } from "axios";
import { IProduct } from "../models/IProduct";
import api from "../http";

export default class ProductService {
  static fetchProducts(): Promise<AxiosResponse<IProduct[]>> {
    return api.get<IProduct[]>("/product");
  }
}
