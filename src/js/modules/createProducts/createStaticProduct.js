import { getInCartContainer, setProduct } from "../appData.js";
import initBumpProduct from "../handleBumps/initBumpProduct.js";
import createProductBase from "./createProductBase.js";

const createStaticProduct = (product) => {
  setProduct({ product, variant: product.variants[0] });
  const { card, image, imageWrapper, productTitle, optionTitle, productInfoWrapper } = createProductBase();
  productTitle.innerHTML = product.properties?.title || product.title;
  image.alt = product.title;
  image.src = product.variants[0].image.url;
  if (product.properties.quantity) {
    const span = document.createElement("span");
    span.innerHTML = product.properties.quantity;
    imageWrapper.appendChild(span);
  }
  if (product.properties?.onBump) initBumpProduct({ product, card, productInfoWrapper });
  else getInCartContainer().appendChild(card);
};

export default createStaticProduct;
