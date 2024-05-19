import { makeAutoObservable } from "mobx";
import { IProduct } from "../models/IProduct";

interface ICartItem {
  quantity: number;
  product: IProduct;
}

export default class CartStore {
  items: ICartItem[] = [];
  isDrawerOpen: boolean = false;

  get itemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.items
      .reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity,
        0
      )
      .toPrecision(2);
  }

  constructor() {
    console.log("constructor!");
    const cartJSON = localStorage.getItem("cart");

    if (cartJSON) {
      this.items = JSON.parse(cartJSON);
    }

    makeAutoObservable(this);
  }

  openCartDrawer = () => {
    this.isDrawerOpen = true;
  };

  closeCartDrawer = () => {
    this.isDrawerOpen = false;
  };

  private find = (product: IProduct) => {
    return this.items.find((i) => i.product.id == product.id);
  };

  addToCart = (product: IProduct) => {
    const item = this.find(product);

    if (item) {
      item.quantity++;
    } else {
      this.items.push({
        product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(this.items));
  };

  removeFromCart = (item: ICartItem) => {
    if (item.quantity == 1) {
      this.closeCartDrawer();
      this.items = this.items.filter((i) => i != item);
    } else {
      item.quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(this.items));
  };

  clearCart = () => {
    this.items = [];
    this.closeCartDrawer();
    localStorage.removeItem("cart");
  };
}
