import { useFetch } from "../hooks/useFetch";
import ProductsList from "../components/ProductsList";
import { useState } from "react";

function Home() {
  const initialLink = "https://dummyjson.com/products";
  const moreProductsLink = "https://dummyjson.com/products?limit=194";

  const { data, isPending, error, setUrl } = useFetch(initialLink);
  const [allproducts, setAllproducts] = useState(false);

  const handleSeeMore = () => {
    setUrl(moreProductsLink);
    setAllproducts(true);
  };

  return (
    <div>
      {isPending && <h3>Loading...</h3>}
      {data && <ProductsList data={data} />}
      {error && <p>{error}</p>}
      {data && !allproducts ? (
        <button
          className="btn btn-fifty site-container"
          onClick={handleSeeMore}
        >
          See All Products
        </button>
      ) : (
        <h2 className="btn btn-fifty site-container">No more products left</h2>
      )}
    </div>
  );
}

export default Home;
