import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../hooks/useGlobalContext";

function PurchasedItem({ product }) {
  const { deleteProduct, decreaseAmount, increaseAmount } = useGlobalContext();
  const [amount, setAmount] = useState(product.amount);

  useEffect(() => {
    setAmount(product.amount);
  }, [product.amount]);

  return (
    <li className="grid grid-cols-3  items-center rounded-lg border">
      <img src={product.thumbnail} alt={product.title} className="w-28 h-28" />
      <div className="flex-col flex  gap-y-1.5">
        <h3>{product.title}</h3>
        <p>{product.price}$</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-4">
          <button
            className="btn border rounded-full w-120 h-8 btn-warning"
            onClick={() => increaseAmount(product.id)}
          >
            +
          </button>
          <p className="font-bold">{amount}</p>
          <button
            className="btn border rounded-full w-120 h-8 btn-warning"
            onClick={() => {
              if (product.amount === 1) {
                deleteProduct(product.id);
              } else {
                decreaseAmount(product.id);
              }
            }}
          >
            -
          </button>
        </div>
        <button onClick={() => deleteProduct(product.id)}>
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default PurchasedItem;
