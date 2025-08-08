import { getBumpContainer } from "../appData.js";
import createProductBase from "../createProducts/createProductBase.js";
import createBumpButtons from "./createBumpButtons.js";


const handleQuantityBump = ({ affect, quantity, name, image, price, couponCode }) => {
  const {card, image: cardImage, productTitle, productInfoWrapper} = createProductBase()
  cardImage.src = image;
  cardImage.alt = name
  productTitle.innerHTML = name;
  getBumpContainer().appendChild(card);
  createBumpButtons({ price, productInfoWrapper, affect, card, couponCode, quantity });
};

export default handleQuantityBump