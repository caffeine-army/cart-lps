import { setProduct } from "./appData.js";

const handleNoCartProducts = (products) => {
  products.forEach((product) => {
    const validVariant = product.variants.find((variant) => variant.availableForSale);
    setProduct({ product, variant: validVariant });
  });
};

export default handleNoCartProducts;
