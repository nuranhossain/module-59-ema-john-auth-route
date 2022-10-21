import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { removeFromDb } from "../../utilities/fakedb";

const Orders = () => {
  let { initialCart } = useLoaderData();
  let [carts, setCart] = useState(initialCart);

  // remove from local storage

  let handleRemoveItem = (id) => {
    let removeItem = carts.filter((cart) => cart.id !== id);
    setCart(removeItem);
    removeFromDb(id);
  };

  // sum

  let total = 0;
  let Shipping = 0;
  let quantity = 0;
  let GrandTotal = 0;
  for (let price of carts) {
    quantity = quantity + price.quantity;
    total = total + price.price * price.quantity;
    Shipping = Shipping + price.shipping;
  }

  let tax = total * 0.1;
  GrandTotal = total + Shipping + tax;

  return (
    <div className=" cart-containers oder-container">
      {carts.map((cart) => (
        <div className="single-cart">
          <img src={cart.img} alt="Products" />
          <p>Quantity: {cart.quantity}</p>
          <p>Name: {cart.name.slice(0, 12).concat("...")}</p>
          <p>${cart.price}</p>
          <div>
            <button
              onClick={() => handleRemoveItem(cart.id)}
              className="remove"
            >
              <i className="fa-solid  fa-trash-can"></i>
            </button>
          </div>
        </div>
      ))}
      <h3 className="text">Total Price: {total}</h3>
      <h3 className="text">Total shipping: {Shipping}</h3>
      <h3 className="text">Total tax: {tax.toFixed(2)}</h3>
      <h2 className="text">Grand total: {GrandTotal.toFixed(2)}</h2>
    </div>
  );
};

export default Orders;
