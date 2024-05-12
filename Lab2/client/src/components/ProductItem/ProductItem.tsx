import { API_URL } from "../../http";
import { IProduct } from "../../models/IProduct";

interface Props {
  product: IProduct;
}

export const ProductItem = ({ product }: Props) => {
  return (
    <div className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          alt=""
          src={`${API_URL}/${product.img}`}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
    </div>
  );
};
