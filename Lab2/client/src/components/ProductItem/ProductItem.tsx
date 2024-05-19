import { API_URL } from "../../http";
import { IProduct } from "../../models/IProduct";
import { useStoreContext } from "../../store";

interface Props {
  product: IProduct;
}

export const ProductItem = ({ product }: Props) => {
  const {
    cartStore: { addToCart },
  } = useStoreContext();

  return (
    <div className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
        <img
          alt=""
          src={`${API_URL}/${product.img}`}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="flex flex-row items-center justify-between mt-4">
        <div>
          <h3 className="text-sm text-gray-700">{product.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            ${product.price}
          </p>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none group-active:opacity-80"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
