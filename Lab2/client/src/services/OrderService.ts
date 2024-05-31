import { AxiosResponse } from "axios";
import api from "../http";
import { ICheckout } from "../ICheckout";
import { IOrder } from "../models/IOrder";
import { IPaginatedList } from "./../../../server/src/types/paginatedList";

export default class OrderService {
  static fetchOrders(
    page: number
  ): Promise<AxiosResponse<IPaginatedList<IOrder>>> {
    return api.get<IPaginatedList<IOrder>>("/order", {
      params: { page },
    });
  }

  static checkout(order: ICheckout): Promise<AxiosResponse> {
    return api.post("/order", order);
  }
}
