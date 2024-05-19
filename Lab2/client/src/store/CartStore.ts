import { makeAutoObservable } from "mobx";
import { IProduct } from "../models/IProduct";

export default class CartStore {
  items: IProduct[] = [];
  isDrawerOpen: boolean = false;

  get itemCount() {
    return this.items.length;
  }

  get totalPrice() {
    return this.items
      .reduce((sum, item) => sum + Number(item.price), 0)
      .toPrecision(2);
  }

  constructor() {
    const cartJSON = localStorage.getItem("cart");

    if (cartJSON) {
      this.items = JSON.parse(cartJSON);
    }

    makeAutoObservable(this);
  }

  private setItems = (items: IProduct[]) => {
    this.items = items;
  };

  openCartDrawer = () => {
    this.isDrawerOpen = true;
  };

  closeCartDrawer = () => {
    this.isDrawerOpen = false;
  };

  addToCart = (item: IProduct) => {
    this.setItems([...this.items, item]);
    localStorage.setItem("cart", JSON.stringify(this.items));
  };

  removeFromCart = (item: IProduct) => {
    if (this.items.length == 1) {
      this.closeCartDrawer();
    }
    this.setItems(this.items.filter((i) => i.id != item.id));
    localStorage.setItem("cart", JSON.stringify(this.items));
  };

  clearCart = () => {
    this.closeCartDrawer();
    this.setItems([]);
    localStorage.removeItem("cart");
  };
}
