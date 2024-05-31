import { makeAutoObservable } from "mobx";

import { RootStore } from "./RootStore";
import { ICheckout } from "../ICheckout";
import OrderService from "../services/OrderService";
import { IOrder } from "../models/IOrder";
import { PaginatedResponse } from "../models/response/PaginatedResponse";

export default class OrderStore {
  page: number = 1;
  limit = 2;
  pageCount = 0;
  orders: IOrder[] = [];
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setOrders(orders: IOrder[]) {
    this.orders = orders;
  }

  setPagination = (pagination: Omit<PaginatedResponse<unknown>, "items">) => {
    this.page = Number(pagination.page);
    this.limit = Number(pagination.limit);
    this.pageCount = Number(pagination.pageCount);
  };

  fetchOrders = async () => {
    this.rootStore.uiStore.setIsFetching(true);
    try {
      const response = await OrderService.fetchOrders(1);
      this.setOrders(response.data.items);
      this.setPagination(response.data);
    } catch (e) {
      this.rootStore.uiStore.handleFetchError(e);
    } finally {
      this.rootStore.uiStore.setIsFetching(false);
    }
  };

  fetchNextPage = async (page: number) => {
    this.rootStore.uiStore.setIsFetchingNext(true);
    try {
      const response = await OrderService.fetchOrders(page);
      this.setOrders(this.orders.concat(response.data.items));
      this.setPagination(response.data);
    } catch (e) {
      this.rootStore.uiStore.handleFetchNextError(e);
    } finally {
      this.rootStore.uiStore.setIsFetchingNext(false);
    }
  };

  checkout = async (checkout: ICheckout) => {
    this.rootStore.uiStore.setIsPosting(true);
    try {
      await OrderService.checkout(checkout);
      this.rootStore.cartStore.clearCart();
    } catch (error) {
      this.rootStore.uiStore.handlePostError(error);
    } finally {
      this.rootStore.uiStore.setIsPosting(false);
    }
  };
}
