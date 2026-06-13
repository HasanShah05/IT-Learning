import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Summary() {
  const { state, dispatch } = useContext(CartContext);

  const totalItems = state.cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const totalPrice = state.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
   <div className="container">
  <div className="summary">
        <h3>Total Items: {totalItems}</h3>
        <h3>Total Price: ₹{totalPrice}</h3>
        <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}