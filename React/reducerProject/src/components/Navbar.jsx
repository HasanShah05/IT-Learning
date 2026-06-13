import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { state } = useContext(CartContext);

  const totalItems = state.cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

return <div className="navbar">🛒 Cart Items: {totalItems}</div>;
}