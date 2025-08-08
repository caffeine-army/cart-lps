import { getCartWrapper } from "./appData.js";

const openCart = () => {
  document.body.style.overflow = "hidden";
  getCartWrapper().classList.add("active");
};

export default openCart;
