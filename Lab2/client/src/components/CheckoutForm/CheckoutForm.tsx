import { useEffect } from "react";
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";

import { Spinner } from "../Loaders";
import { InputField } from "../Input";
import { ICheckout } from "../../ICheckout";
import { CartItem } from "../Cart/CartItem";
import { useStoreContext } from "../../store";
import { checkoutFormValidation } from "./utils/CheckoutFormValidation";

export const CheckoutForm = observer(() => {
  const {
    uiStore: { postError, isPosting, setPostError },
    cartStore: { items, removeFromCart, totalPrice },
    orderStore: { checkout },
  } = useStoreContext();

  useEffect(() => {
    return () => setPostError(null);
  });

  const initialValues: ICheckout = {
    address: "",
    lastName: "",
    firstName: "",
    orderDetails: items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    })),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutFormValidation}
      onSubmit={(values, { setSubmitting }) => {
        try {
          checkout(values);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Form className="lg:gap-12 xl:gap-16 lg:grid lg:grid-cols-2">
        <div>
          <h2 className="text-gray-900 font-medium text-lg mb-4">
            Shipping information
          </h2>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <InputField label="First name" name="firstName" type="text" />
            <InputField label="Last name" name="lastName" type="text" />
            <div className="col-span-2">
              <InputField label="Address" name="address" type="text" />
            </div>
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <h2 className="text-gray-900 font-medium text-lg mb-4">
            Order summary
          </h2>

          <div className="shadow-sm border border-x-gray-200 rounded-md divide-y divide-gray-200">
            <ul className="divide-y divide-gray-200 overflow-x-hidden">
              {items.map((item) => (
                <div key={item.product.id} className="px-6">
                  <CartItem
                    remove={() => removeFromCart(item)}
                    product={item.product}
                    quantity={item.quantity}
                  />
                </div>
              ))}
            </ul>
            <div className="flex flex-row justify-between p-6 font-medium">
              <p>Total</p>
              <p className="text-gray-900">${totalPrice}</p>
            </div>
            <div className="p-6">
              {postError && <h1 className="text-red-600">{postError}</h1>}
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                {isPosting ? <Spinner /> : "Confirm order"}
              </button>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
});
