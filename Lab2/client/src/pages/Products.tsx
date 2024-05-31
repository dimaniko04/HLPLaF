import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "../store";
import { FetchWrapper } from "../components/FetchWrapper";

import ProductItem from "../components/ProductItem";
import Pagination from "../components/Pagination";

const Products = observer(() => {
  const {
    productStore: { products, page, pageCount, fetchProducts },
  } = useStoreContext();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
      {pageCount > 1 && (
        <Pagination
          page={page}
          pageCount={pageCount}
          onPageChange={(page) => fetchProducts(page)}
        />
      )}

      <FetchWrapper noItemsText="No Products!" items={products}>
        <h2 className="sr-only">Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </FetchWrapper>
    </div>
  );
});

export default Products;
