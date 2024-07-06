import { useGlobalContext } from "../hooks/useGlobalContext";
import PurchasedItem from "../components/PurchasedItem";
import { Link } from "react-router-dom";

function Purchased() {
  const { products } = useGlobalContext();
  return (
    <div className="site-container">
      <ul className="grid grid-rows-3 items-center gap-6">
        {products.length > 0 &&
          products.map((product) => {
            return <PurchasedItem key={product.id} product={product} />;
          })}
      </ul>
    </div>
  );
}

export default Purchased;
