import updateCartQuantity from "../updateCartQuantity.js";
import createDependentProduct from "./createDependentProduct.js";
import createIndependendProduct from "./createIndependentProduct.js";
import createMultiProduct from "./createMultiProduct.js";
import createStaticProduct from "./createStaticProduct.js";

const createProducts = (products) => {
  products.forEach((product) => {
    if (product.properties?.bumpPrice){
      product.properties.onBump = true;
    } 
    else updateCartQuantity({ qtty: product.properties?.quantity || 1, operation: "add" });
    if (product.variants.length === 1) createStaticProduct(product);
    else if (product.options.length > 1) createDependentProduct(product);
    else if (product.properties?.quantity) createMultiProduct(product);
    else createIndependendProduct(product);
  });
};

export default createProducts;
