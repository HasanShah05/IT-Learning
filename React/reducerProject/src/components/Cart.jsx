import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { state } = useContext(CartContext);

  return (
    <div className="container cart">
      <h2>Cart</h2>
      {state.cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}