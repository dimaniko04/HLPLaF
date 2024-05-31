import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "../store";
import { FetchWrapper } from "../components/FetchWrapper";

import ProductItem from "../components/ProductItem";
import { Carousel } from "../components/Carousel/Carousel";

const Recommendations = observer(() => {
  const {
    productStore: { recommendations, fetchUserRecommendations },
  } = useStoreContext();

  useEffect(() => {
    fetchUserRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(recommendations);

  return (
    <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl tracking-tight font-bold mb-10 text-gray-900 mt-5">
        Recommended for you
      </h1>

      <FetchWrapper noItemsText="No Recommendations!" items={recommendations}>
        <h2 className="sr-only">Products</h2>

        <Carousel limit={recommendations.length}>
          {recommendations.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Carousel>
      </FetchWrapper>
    </div>
  );
});

export default Recommendations;
