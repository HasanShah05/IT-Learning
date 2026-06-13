import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Summary from "./components/Summary";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <ProductList />
      <Cart />
      <Summary />
    </CartProvider>
  );
}

export default App;