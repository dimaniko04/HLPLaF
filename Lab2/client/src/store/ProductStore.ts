import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { IProduct } from "../models/IProduct";
import ProductService from "../services/ProductService";

export default class ProductStore {
  rootStore: RootStore;

  products: IProduct[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setProducts = (products: IProduct[]) => {
    this.products = products;
  };

  fetchProducts = async () => {
    this.rootStore.uiStore.setIsFetching(true);
    try {
      const response = await ProductService.fetchProducts();
      this.setProducts(response.data);
    } catch (e) {
      this.rootStore.uiStore.handleFetchError(e);
    } finally {
      this.rootStore.uiStore.setIsFetching(false);
    }
  };
}
