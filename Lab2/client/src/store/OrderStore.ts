import { makeAutoObservable } from "mobx";

import { RootStore } from "./RootStore";
import { ICheckout } from "../ICheckout";
import OrderService from "../services/OrderService";
import { IOrder } from "../models/IOrder";

export default class OrderStore {
  orders: IOrder[] = [];
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setOrders(orders: IOrder[]) {
    this.orders = orders;
  }

  fetchOrders = async () => {
    this.rootStore.uiStore.setIsFetching(true);
    try {
      const response = await OrderService.fetchOrders();
      this.setOrders(response.data);
    } catch (e) {
      this.rootStore.uiStore.handleFetchError(e);
    } finally {
      this.rootStore.uiStore.setIsFetching(false);
    }
  };

  checkout = async () => {
    this.rootStore.uiStore.setIsPosting(true);
    try {
      const cartItems = this.rootStore.cartStore.items;
      const order: ICheckout = {
        orderDetails: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };
      await OrderService.checkout(order);
      this.rootStore.cartStore.clearCart();
    } catch (error) {
      this.rootStore.uiStore.handlePostError(error);
    } finally {
      this.rootStore.uiStore.setIsPosting(false);
    }
  };
}
