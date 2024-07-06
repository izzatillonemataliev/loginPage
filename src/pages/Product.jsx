// react router dom imports
import { useParams, Link } from "react-router-dom";
// custom hooks
import { useFetch } from "../hooks/useFetch";
import { useGlobalContext } from "../hooks/useGlobalContext";
// react hooks
import { useState } from "react";

function Product() {
  const { id } = useParams();
  const { addProduct } = useGlobalContext();
  const { data, isPending, error } = useFetch(
    `https://dummyjson.com/products/` + id
  );
  console.log(data);
  const [amount, setAmount] = useState(0);

  const handleAdd = () => {
    addProduct({ ...data, amount });
  };

  const minusgakirmaslik = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };
  console.log(data);
  return (
    <div>
      {isPending && <h3>Loading...</h3>}
      {data && (
        <div>
          <Link to="/">
            <button className="btn btn-secondary mb-6 ">Go Home</button>
          </Link>
          <div className="grid grid-cols-2">
            <div className="flex flex-col align-center justify-center">
              <img
                src={data.thumbnail}
                alt={data.title}
                className="w-96 h-96 mb-10"
              />
            </div>
            <div>
              <div>
                <h2 className="mb-5">
                  <span className="font-bold text-2xl">Title :</span> <br />
                  {data.title}
                </h2>
                <p className="tracking-wide mb-5">
                  <span className="font-bold text-xl mb-2">Description :</span>
                  <br />
                  {data.description}
                </p>
                <h4 className="mb-10">
                  <span className="font-bold text-xl">
                    Warranty Information:{" "}
                  </span>
                  {data.warrantyInformation}
                </h4>
                <h3 className="flex justify-end  gap-3 mb-10">
                  <span className="font-bold text-xl">
                    Price: {data.price}$
                  </span>
                  <span className="font-bold text-xl">
                    Category: {data.category}
                  </span>
                  <span className="font-bold text-xl">Brand: {data.brand}</span>
                  <span className="flex items-center gap-3 font-bold text-xl">
                    Raiting: {data.rating}
                    <div className="rating">
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        readOnly
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        readOnly
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        readOnly
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        readOnly
                      />
                      <input
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                        readOnly
                        checked
                      />
                    </div>
                  </span>
                </h3>
                <div className="card-actions flex items-center">
                  <button
                    className=" btn btn-success"
                    onClick={() => setAmount(amount + 1)}
                  >
                    +
                  </button>
                  <div>
                    <h2>{amount}</h2>
                  </div>
                  <button
                    className="btn font-semibold btn-warning"
                    onClick={() => setAmount(minusgakirmaslik)}
                    disabled={amount === 0}
                  >
                    -
                  </button>
                  <div>
                    <button
                      onClick={handleAdd}
                      className="btn btn-primary ml-10"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
