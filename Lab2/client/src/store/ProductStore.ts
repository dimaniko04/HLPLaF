import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { IProduct } from "../models/IProduct";
import ProductService from "../services/ProductService";
import { PaginatedResponse } from "../models/response/PaginatedResponse";

export default class ProductStore {
  rootStore: RootStore;

  page = 1;
  limit = 10;
  pageCount = 0;
  products: IProduct[] = [];
  recommendations: IProduct[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setProducts = (products: IProduct[]) => {
    this.products = products;
  };

  setRecommendations = (recommendations: IProduct[]) => {
    this.recommendations = recommendations;
  };

  setPagination = (pagination: Omit<PaginatedResponse<unknown>, "items">) => {
    this.page = pagination.page;
    this.limit = pagination.limit;
    this.pageCount = pagination.pageCount;
  };

  fetchProducts = async (page = 1, limit = 10) => {
    this.rootStore.uiStore.setIsFetching(true);
    try {
      const response = await ProductService.fetchProducts(page, limit);
      this.setProducts(response.data.items);
      this.setPagination(response.data);
    } catch (e) {
      this.rootStore.uiStore.handleFetchError(e);
    } finally {
      this.rootStore.uiStore.setIsFetching(false);
    }
  };

  fetchUserRecommendations = async () => {
    this.rootStore.uiStore.setIsFetching(true);
    try {
      const response = await ProductService.fetchRecommendations();
      this.setRecommendations(response.data);
    } catch (e) {
      this.rootStore.uiStore.handleFetchError(e);
    } finally {
      this.rootStore.uiStore.setIsFetching(false);
    }
  };
}
