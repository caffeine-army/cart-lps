import { getBumpContainer } from "../appData.js";

const resetBumpDom = () => {
  const bumpDom = getBumpContainer();
  bumpDom.querySelectorAll(".cart__product").forEach(el=>el.remove())
};

export default resetBumpDom;
