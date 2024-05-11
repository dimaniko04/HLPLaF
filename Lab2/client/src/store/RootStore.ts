import UiStore from "./UiStore";
import UserStore from "./UserStore";

export class RootStore {
  userStore = new UserStore(this);
  uiStore = new UiStore();
}
