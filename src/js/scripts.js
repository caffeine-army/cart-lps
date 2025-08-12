import { getData, getInCartContainer, resetCoupons, resetProducts, setCoupons } from "./modules/appData.js";
import createCart from "./modules/createCart.js";
import createProducts from "./modules/createProducts/createProducts.js";
import fetchProducts from "./modules/fetchProducts.js";
import filterProducts from "./modules/filterProducts.js";
import handleQuantityBump from "./modules/handleBumps/handleQuantityBump.js";
import resetBumpDom from "./modules/handleBumps/resetBumpDom.js";
import handleCookieBanner from "./modules/handleCookieBanner.js";
import handleError from "./modules/handleError.js";
import handleNoCartProducts from "./modules/handleNoCartProducts.js";
import handlePurchase from "./modules/handlePurchase.js";
import openCart from "./modules/openCart.js";
import toggleLoading from "./modules/toggleLoading.js";
import firePageLoad from "./modules/tripleWhale/firePageLoad.js";
import updateCartQuantity from "./modules/updateCartQuantity.js";

const lpCart = async (properties) => {
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      document.body.classList.remove("loading");
    }
  });
  try {
    const { products, customButtons, bump, noCart } = properties;
    
    toggleLoading();
    await fetchProducts([...products, ...(bump?.ids || [])]);

    if (getData().some((prod) => !prod.availableForSale)) throw new Error(`Out of stock product`);

    createCart();

    const buttons = document.querySelectorAll("[cart-button]");
    buttons.forEach((button) => {
      const productsProperties = [...((customButtons && customButtons[button.id]?.products) || properties.products), ...(bump?.ids || [])];
      const couponCode = (customButtons && customButtons[button.id]?.couponCode) || properties.couponCode;
      button.addEventListener("click", () => {
        getInCartContainer().innerHTML = "";
        resetBumpDom();
        resetProducts();
        resetCoupons();
        updateCartQuantity({ operation: "reset" });

        setCoupons(couponCode);
        if (noCart) {
          handleNoCartProducts(filterProducts(productsProperties));
          handlePurchase();
          return;
        }
        createProducts(filterProducts(productsProperties));
        if (bump?.type === "quantity") handleQuantityBump(bump);
        openCart();
      });
    });
    toggleLoading();
    firePageLoad();
    handleCookieBanner();
  } catch (e) {
    console.error(e);
    handleError();
  }
};

window.lpCart = lpCart;
