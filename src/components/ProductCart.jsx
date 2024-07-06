// react router dom imports
import { Link } from "react-router-dom";
import Product from "../pages/Product";

function ProductCart({ product }) {
  const {
    title,
    id,
    brand,
    availabilityStatus,
    description,
    category,
    thumbnail,
    price,
  } = product;
  return (
    <Link to={`/product/${id}`}>
      <div
        style={{ marginBottom: "35px" }}
        className="card  card-compact w-96 bg-base-100 shadow-xl"
      >
        <figure>
          <img src={thumbnail} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="uppercase">Brand: {brand}</h2>
          <h3 className="card-title">
            Title : <br />
            {title}
          </h3>
          <p>Price: {price}</p>
          <p> {description} </p>
          <h2 className="uppercase font-bold ">Category : {category} </h2>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCart;
