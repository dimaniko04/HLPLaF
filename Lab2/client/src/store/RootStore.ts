import ProductStore from "./ProductStore";
import UiStore from "./UiStore";
import UserStore from "./UserStore";

export class RootStore {
  uiStore = new UiStore();
  userStore = new UserStore(this);
  productStore = new ProductStore(this);
}
