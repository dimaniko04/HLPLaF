import { makeAutoObservable } from "mobx";

import { RootStore } from "./RootStore";
import { ICheckout } from "../ICheckout";
import OrderService from "../services/OrderService";

export default class OrderStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

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
