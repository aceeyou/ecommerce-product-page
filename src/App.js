import { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import NavBar from "./components/NavBar";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const onAddToCartMain = (productName, quantity, price) => {
    // alert("added to cart");
    setCartItems((c) => [
      { productName, quantity, price, id: Math.random() },
      ...c,
    ]);
  };
  return (
    <div className="App">
      <NavBar cartItems={cartItems} setCartItems={setCartItems} />
      <Main onAddToCartMain={onAddToCartMain} />
    </div>
  );
}

export default App;
