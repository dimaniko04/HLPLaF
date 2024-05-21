import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";

import { useStoreContext } from "../store";
import { CheckoutForm } from "../components/CheckoutForm";

export const Checkout = observer(() => {
  const {
    cartStore: { items },
  } = useStoreContext();

  if (!items.length) {
    return <Navigate to="/orders" />;
  }

  return (
    <div className="max-w-7xl px-8 pt-16 pb-24 mx-auto">
      <CheckoutForm />
    </div>
  );
});
