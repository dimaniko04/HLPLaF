import { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "../store";
import { FetchWrapper } from "../components/FetchWrapper";
import { OrderItem } from "../components/OrderItem";
import { Dots } from "../components/Loaders";

const Orders = observer(() => {
  const {
    orderStore: { orders, fetchOrders, fetchNextPage, page, pageCount },
    uiStore: { isFetchingNext, setFetchError },
  } = useStoreContext();

  const handleScroll = useCallback(() => {
    if (page >= pageCount) {
      return;
    }
    const scrolledHeight =
      window.innerHeight + document.documentElement.scrollTop;
    const offsetHeight = document.documentElement.scrollHeight;
    if (scrolledHeight < offsetHeight - 72 || isFetchingNext) {
      return;
    }
    fetchNextPage(page + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageCount]);

  useEffect(() => {
    fetchOrders();
    return () => {
      setFetchError(null);
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="max-w-5xl m-auto mt-14 px-10 pb-10">
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

        {isFetchingNext && <Dots />}
      </FetchWrapper>
    </div>
  );
});

export default Orders;
