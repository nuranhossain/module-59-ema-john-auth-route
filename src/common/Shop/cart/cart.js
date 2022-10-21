import React from "react";
import "./Cart.css";

const Cart = (props) => {
  let { handleRemoveItem } = props.handleRemoveItem;

  console.log(handleRemoveItem);
  let { id, name, img, price, ratings, seller, quantity } = props.cart;
  let backUp =
    "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8d1d26e792fa4654b597ae32012603bd_9366/NMD_R1_Shoes_Black_GX6978_01_standard.jpg";

  return (
    <div>
      <div className="single-cart">
        <img
          src={img}
          alt="Products"
          onError={(e) => {
            e.currentTarget.src = backUp;
          }}
        />
        <p>Quantity: {quantity}</p>
        <p>Name: {name.slice(0, 12).concat("...")}</p>
        <p>${price}</p>
        <button onClick={() => props.handleRemoveItem(id)}>Remove</button>
      </div>
    </div>
  );
};

export default Cart;
