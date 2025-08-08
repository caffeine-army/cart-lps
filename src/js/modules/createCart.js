import { setBumpContainer, setCartWrapper, setInCartContainer } from "./appData.js";
import handlePurchase from "./handlePurchase.js";

const createCart = () => {
  const cartWrapper = document.createElement("div");
  setCartWrapper(cartWrapper);
  const cartOverlay = document.createElement("div");
  const cart = document.createElement("div");
  const cartHead = document.createElement("div");
  const cartTitleWrapper = document.createElement("div");
  const cartProdContainer = document.createElement("div");
  const cartInCartContainer = document.createElement("div");
  setInCartContainer(cartInCartContainer);
  const cartOrderBumpsContainer = document.createElement("div");
  setBumpContainer(cartOrderBumpsContainer)
  const bumpTitleDiv = document.createElement("div");
  const cartFoot = document.createElement("div");
  const buyButton = document.createElement("button");
  buyButton.innerHTML = "Comprar Agora";

  cartTitleWrapper.classList.add("cart__title-wrapper");

  const cartIcon = document.createElement("div");
  cartIcon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM208-800h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Z"></path></svg>';
  const cartTitle = document.createElement("p");
  cartTitle.innerHTML = "Carrinho (<span cart-qtty></span>)";
  const closeButton = document.createElement("button");
  bumpTitleDiv.innerHTML = "<p>Você Pode Gostar</p>";

  cartWrapper.classList.add("cart-wrapper");
  cartOverlay.classList.add("cart-overlay");
  cart.classList.add("cart");
  cartHead.classList.add("cart__head");
  closeButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
  closeButton.classList.add("cart__head__close-button");
  cartTitle.classList.add("cart__head__title");
  cartProdContainer.classList.add("cart__prod-container");
  cartInCartContainer.classList.add("cart__in-cart-container");
  cartOrderBumpsContainer.classList.add("cart__order-bumps-container");
  bumpTitleDiv.classList.add("cart__title-div");
  cartFoot.classList.add("cart__foot");
  buyButton.classList.add("buy-button");

  cartWrapper.appendChild(cartOverlay);
  cartWrapper.appendChild(cart);
  cart.appendChild(cartHead);
  cart.appendChild(cartProdContainer);
  cart.appendChild(cartFoot);
  cartOrderBumpsContainer.appendChild(bumpTitleDiv);
  cartProdContainer.appendChild(cartInCartContainer);
  cartProdContainer.appendChild(cartOrderBumpsContainer);
  cartTitleWrapper.appendChild(cartIcon);
  cartTitleWrapper.appendChild(cartTitle);
  cartHead.appendChild(cartTitleWrapper);
  cartHead.appendChild(closeButton);
  cartFoot.appendChild(buyButton);
  document.body.appendChild(cartWrapper);

  [cartOverlay, closeButton].forEach((el) => {
    el.addEventListener("click", () => {
      document.body.style.overflow = "";
      cartWrapper.classList.remove("active");
    });
  });

  buyButton.addEventListener("click", handlePurchase)

  return [cartWrapper, cartInCartContainer, cartOrderBumpsContainer, buyButton];
};

export default createCart;
