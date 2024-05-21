import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import Store from "./store";
import { App } from "./App.tsx";
import { StoreContext } from "./store/index.ts";

import "./index.css";

const store = new Store();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>
);
