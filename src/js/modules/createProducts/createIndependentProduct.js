import { getInCartContainer } from "../appData.js";
import initBumpProduct from "../handleBumps/initBumpProduct.js";
import createDropdownSelector from "./createDropdownSelector/createDropdownSelector.js";
import createProductBase from "./createProductBase.js";

const createIndependendProduct = (product) => {
  const { card, image, productTitle, productInfoWrapper } = createProductBase();
  const validVariant = product.variants.find((variant) => variant.availableForSale);
  image.src = validVariant.image.url;
  image.alt = validVariant.title;
  productTitle.innerHTML = product.properties?.title || product.title;
  const cartDropdown = createDropdownSelector({ product, image });
  productInfoWrapper.appendChild(cartDropdown);
  if (product.properties?.onBump) initBumpProduct({ product, card, productInfoWrapper });
  else getInCartContainer().appendChild(card);
};

export default createIndependendProduct;
