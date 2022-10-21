import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import Cart from "./cart/cart";
import "./Shop.css";
import { useLoaderData } from "react-router-dom";
import { addToDb, getStoredCard, removeFromDb } from "../../utilities/fakedb";

const Shop = () => {
  let products = useLoaderData();
  let [cart, setCart] = useState([]);

  // remove

  let handleRemoveItem = (id) => {
    let removeItem = cart.filter((cart) => cart.id !== id);
    setCart(removeItem);
    removeFromDb(id);
  };

  useEffect(() => {
    let storedCart = getStoredCard();

    let savedCart = [];
    for (let id in storedCart) {
      let addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        let quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  /// sending to cart category and local storage

  let addToCart = (product) => {
    let exists = cart.find((existsProduct) => existsProduct.id === product.id);
    let newCart = [];
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      let rest = cart.filter((prod) => prod.id !== product.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }

    setCart(newCart);
    addToDb(product.id);
  };

  let total = 0;
  let Shipping = 0;
  let quantity = 0;

  for (let price of cart) {
    quantity = quantity + price.quantity;
    total = total + price.price * price.quantity;
    Shipping = Shipping + price.shipping;
  }

  let tax = total * 0.1;

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            addToCart={addToCart}
            key={product.id}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <h1>Order Details</h1>
        <h4>Total Products: {quantity}</h4>
        <div className="calculation">
          <p>Total Price: ${total}</p>
          <p>Total Shipping: ${Shipping}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
        </div>
        <div>
          {cart.map((cart) => (
            <Cart cart={cart} handleRemoveItem={handleRemoveItem}></Cart>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
