import { AxiosResponse } from "axios";
import api from "../http";
import { ICheckout } from "../ICheckout";

export default class OrderService {
  static checkout(order: ICheckout): Promise<AxiosResponse> {
    return api.post("/order", order);
  }
}
