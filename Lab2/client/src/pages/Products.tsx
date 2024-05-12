import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "../store";
import { Dots } from "../components/Loaders";
import { ProductItem } from "../components/ProductItem";

export const Products = observer(() => {
  const {
    productStore: { products, fetchProducts },
    uiStore: { isFetching, fetchError },
  } = useStoreContext();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
      {isFetching && <Dots />}
      {!isFetching && fetchError && (
        <h1 className="text-red-600 mt-5 text-4xl text-center font-semibold tracking-wider">
          {fetchError}
        </h1>
      )}
      {!isFetching && !fetchError && !products.length && (
        <h1 className="mt-5 text-4xl text-center font-semibold tracking-wider">
          No Products!
        </h1>
      )}
      {!isFetching && !fetchError && !!products.length && (
        <>
          <h2 className="sr-only">Products</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
});
