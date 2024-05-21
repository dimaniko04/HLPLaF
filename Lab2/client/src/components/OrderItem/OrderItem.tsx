import { API_URL } from "../../http";
import { IOrder } from "../../models/IOrder";

interface Props {
  order: IOrder;
}

export const OrderItem = ({ order }: Props) => {
  const totalAmount = order.orderDetails
    .reduce(
      (sum, details) => sum + Number(details.product.price * details.quantity),
      0
    )
    .toFixed(2);

  return (
    <li className="border text-gray-500 border-gray-200 rounded-md shadow-sm w-full">
      <div className="border-b border-gray-200 p-6 gap-16 flex flex-row">
        <div>
          <p className="text-gray-900 font-medium mb-1">Date placed</p>
          <time dateTime={String(order.createdAt)}>
            {new Date(order.createdAt).toLocaleDateString()}
          </time>
        </div>

        <div className="text-gray-900">
          <p className="mb-1 font-medium">Status</p>
          <p className="capitalize font-bold">{order.status}</p>
        </div>

        <div className="text-gray-900 font-medium ml-auto text-end">
          <p className="mb-1 font-bold">Total amount</p>
          <p>${totalAmount}</p>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {order.orderDetails.map((details) => (
          <li key={details.id} className="p-6">
            <div className="flex flex-row">
              <div className="h-32 w-32 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={`${API_URL}/${details.product.img}`}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>{details.product.name}</h3>
                  <p className="ml-4">
                    ${(+details.product.price * details.quantity).toFixed(2)}
                  </p>
                </div>
                <p className="mt-2 text-gray-500">{details.quantity}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
};
