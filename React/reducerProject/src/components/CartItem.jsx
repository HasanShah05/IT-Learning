import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem({ item }) {
  const { dispatch } = useContext(CartContext);

  return (
    <div className="cart-item">
      <h4>{item.name}</h4>
      <p>Qty: {item.qty}</p>

      <button onClick={() => dispatch({ type: "INCREASE_QTY", id: item.id })}>
        +
      </button>

      <button onClick={() => dispatch({ type: "DECREASE_QTY", id: item.id })}>
        -
      </button>

      <button onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}>
        Remove
      </button>
    </div>
  );
}