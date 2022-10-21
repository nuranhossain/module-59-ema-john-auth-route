import "./Product.css";

import React from "react";

let backUp =
  "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8d1d26e792fa4654b597ae32012603bd_9366/NMD_R1_Shoes_Black_GX6978_01_standard.jpg";

const Product = (props) => {
  let { id, name, img, price, ratings, seller, shipping, stock } =
    props.product;

  return (
    <div className="product-card">
      <img
        src={img}
        alt="product"
        onError={(e) => {
          e.currentTarget.src = backUp;
        }}
      />
      <div className="product-info">
        <h3>{name}</h3>
        <p>Price: ${price}</p>
        <p>
          <small>Seller: {seller}</small>
        </p>
        <p>
          <small>Rating: {ratings}</small>
        </p>
      </div>
      <button
        onClick={() => props.addToCart(props.product)}
        className="btn-cart"
      >
        <p>Add To Cart</p>
      </button>
    </div>
  );
};

export default Product;
