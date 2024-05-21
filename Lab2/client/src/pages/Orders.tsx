import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "../store";
import { FetchWrapper } from "../components/FetchWrapper";
import { OrderItem } from "../components/OrderItem";

export const Orders = observer(() => {
  const {
    orderStore: { orders, fetchOrders },
  } = useStoreContext();

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-5xl m-auto mt-14 px-10">
      <h1 className="text-3xl tracking-tight font-bold mb-10 text-gray-900">
        Order history
      </h1>

      <FetchWrapper noItemsText="No Orders!" items={orders}>
        <h2 className="sr-only">Orders</h2>

        <ul className="flex flex-col items-center gap-8">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ul>
      </FetchWrapper>
    </div>
  );
});
