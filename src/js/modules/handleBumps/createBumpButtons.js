import { getBumpContainer, getCoupons, getInCartContainer, getProductQuantity, removeCoupon, removeProductAsBump, setCoupons, setProductAsBump, setProductQuantity } from "../appData.js";
import updateCartQuantity from "../updateCartQuantity.js";

const createBumpButtons = ({ price, productInfoWrapper, productId, affect, card, couponCode, quantity }) => {
  const inCartContainer = getInCartContainer();
  const cartOrderBumpsContainer = getBumpContainer();

  const addButton = document.createElement("button");
  addButton.classList.add("add-button");
  addButton.innerHTML = `Adicionar por apenas +R$${price}`;

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.innerHTML = "Adicionado";

  productInfoWrapper.appendChild(addButton);
  productInfoWrapper.appendChild(removeButton);

  const oldQuantities = {};

  let ogCoupon = "";

  addButton.addEventListener("click", () => {
    inCartContainer.appendChild(card);
    ogCoupon = getCoupons();
    setCoupons(couponCode);
    if (productId) {
      updateCartQuantity({qtty: 1,operation: "add"})
      removeProductAsBump({ productId });
    } if (affect) {
      affect.forEach((id) => {
        oldQuantities[id] = getProductQuantity({ productId: id });
        setProductQuantity({ productId: id, quantity: quantity * oldQuantities[id] });
      });
    }
  });
  removeButton.addEventListener("click", () => {
    cartOrderBumpsContainer.appendChild(card);
    removeCoupon(couponCode)
    if (productId) {
      updateCartQuantity({qtty: 1,operation: "subtract"})
      setProductAsBump({ productId });
    } else if (affect) {
      affect.forEach((id) => {
        setProductQuantity({ productId: id, quantity: oldQuantities[id] });
      });
    }
  });
};

export default createBumpButtons;
