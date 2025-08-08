import { getBumpContainer, setProductAsBump } from "../appData.js";
import createBumpButtons from "./createBumpButtons.js";

const initBumpProduct = ({ product, card, productInfoWrapper }) => {
  setProductAsBump({ productId: product.id });
  createBumpButtons({ price: product.properties.bumpPrice, productInfoWrapper, productId: product.id, card, couponCode: product.properties.couponCode });
  getBumpContainer().appendChild(card);
};

export default initBumpProduct;
