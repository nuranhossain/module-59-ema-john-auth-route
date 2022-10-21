import { getStoredCard } from "../utilities/fakedb";

export let productsAndCartLoader = async () => {
  // get products
  let productsData = await fetch("products.json");
  let products = await productsData.json();

  // get cart

  let savedCart = getStoredCard();

  let initialCart = [];

  for (let id in savedCart) {
    let addedProduct = products.find((product) => product.id === id);
    if (addedProduct) {
      let quantity = savedCart[id];
      addedProduct.quantity = quantity;
      initialCart.push(addedProduct);
    }
  }
  return { products, initialCart };
};
