import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext);

  return (
    <div className="card"> 
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <button
        onClick={() =>
          dispatch({ type: "ADD_TO_CART", payload: product })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}