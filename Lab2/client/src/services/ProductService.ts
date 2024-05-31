import { AxiosResponse } from "axios";

import api from "../http";
import { IProduct } from "../models/IProduct";
import { IPaginatedList } from "./../../../server/src/types/paginatedList";

export default class ProductService {
  static fetchProducts(
    page: number,
    limit: number
  ): Promise<AxiosResponse<IPaginatedList<IProduct>>> {
    return api.get<IPaginatedList<IProduct>>("/product", {
      params: { page, limit },
    });
  }
}
