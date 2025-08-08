import { getCoupons, getProducts } from "./appData.js";
import getApiEndpoint from "./getApiEndpoint.js";
import toggleLoading from "./toggleLoading.js";

const isValid = () => {
  const cards = document.querySelectorAll(".cart__product");
  let isValid = true;
  cards.forEach((card) => {
    if (card.querySelector(".cart__variant-placeholder")) {
      card.querySelector(".cart__variant-selection__container").classList.add("shake");
      isValid = false;
    }
  });
  return isValid;
};

const handlePurchase = async () => {
  if (!isValid()) return;
  try {
    toggleLoading();
    const products = getProducts();
    const response = await fetch(getApiEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation cartCreate($input: CartInput) {
          cartCreate(input: $input) {
            cart {
              id
              checkoutUrl
            }
          }
        }`,
        variables: {
          input: {
            lines: Object.keys(products).filter(key=>!products[key].isBump).flatMap((key) => Object.keys(products[key].variants).map((variantKey) => ({ merchandiseId: variantKey, quantity: products[key].variants[variantKey].quantity * (products[key].quantity || 1) }))),
            discountCodes: getCoupons(),
            // attributes: [
            //   {
            //     key: "<your-key>",
            //     value: "<your-value>",
            //   },
            // ],
          },
        },
      }),
    });
    const urlParams = new URLSearchParams(window.location.search);
    const data = await response.json();
    window.location.href = `${data.data.cartCreate.cart.checkoutUrl}?${urlParams}`;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default handlePurchase;
