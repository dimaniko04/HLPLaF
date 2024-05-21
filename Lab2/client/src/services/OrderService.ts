import { AxiosResponse } from "axios";
import api from "../http";
import { ICheckout } from "../ICheckout";
import { IOrder } from "../models/IOrder";

export default class OrderService {
  static fetchOrders(): Promise<AxiosResponse<IOrder[]>> {
    return api.get<IOrder[]>("/order");
  }
  
  static checkout(order: ICheckout): Promise<AxiosResponse> {
    return api.post("/order", order);
  }
}
