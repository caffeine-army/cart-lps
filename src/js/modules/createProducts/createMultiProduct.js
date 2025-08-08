import { getInCartContainer, removeProductVariant, setEmptyProduct, setMultiProduct } from "../appData.js";

const createPlaceholder = () => {
  const placeholder = document.createElement("div");
  placeholder.classList.add("cart__variant-placeholder");
  placeholder.innerHTML = "<p>Your Choice</p><div></div>";
  return placeholder;
};

const createButton = ({ variant, hasXmark }) => {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("cart__variant-button");
  button.innerHTML = `<span>${variant.title}</span><img src="${variant.image.url}">`;
  if (hasXmark) {
    const span = document.createElement("span");
    span.innerHTML =
      '<svg fill="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
    button.appendChild(span);
  }
  if (!variant.availableForSale) button.setAttribute("disabled", "disabled");
  return button;
};

const handleSelectionVisibility = ({ placeholders, variantSelection }) => {
  const placeholder = placeholders.querySelector(".cart__variant-placeholder");
  if (!placeholder) {
    variantSelection.style.display = "none";
  } else {
    variantSelection.style = "";
  }
};

const createMultiProduct = (product) => {
  setEmptyProduct(product);
  const card = document.createElement("div");
  const container = document.createElement("div");
  const info = document.createElement("div");
  const productTitle = document.createElement("p");
  const placeholders = document.createElement("div");
  const variantSelection = document.createElement("div");
  const variantSelectionTitle = document.createElement("p");
  const variantSelectionContainer = document.createElement("div");

  variantSelectionTitle.innerHTML = "Selecione suas opções:";
  productTitle.innerHTML = product.title;

  card.classList.add("cart__product");
  container.classList.add("cart__product__container");
  info.classList.add("cart__product__info");
  productTitle.classList.add("cart__product__title");
  placeholders.classList.add("cart__placeholders");
  variantSelection.classList.add("cart__variant-selection");
  variantSelectionContainer.classList.add("cart__variant-selection__container");

  card.appendChild(container);
  card.appendChild(variantSelection);
  container.appendChild(info);
  info.appendChild(productTitle);
  info.appendChild(placeholders);
  variantSelection.appendChild(variantSelectionTitle);
  variantSelection.appendChild(variantSelectionContainer);

  for (let i = 0; i < (product.properties?.quantity || 1); i++) {
    placeholders.appendChild(createPlaceholder());
  }

  product.variants.forEach((variant) => {
    const button = createButton({ product, variant });
    button.addEventListener("click", () => {
      const placeholder = placeholders.querySelector(".cart__variant-placeholder");
      if (!placeholder) return;
      const button = createButton({ product, variant, hasXmark: true, });
      placeholder.after(button);
      placeholder.remove();
      variantSelectionContainer.classList.remove("shake");
      handleSelectionVisibility({ placeholders, variantSelection });
      setMultiProduct({ product, variant });
      button.addEventListener("click", () => {
        button.remove();
        placeholders.appendChild(createPlaceholder());
        handleSelectionVisibility({ placeholders, variantSelection });
      });
    });
    variantSelectionContainer.appendChild(button);
  });

  getInCartContainer().appendChild(card);
};

export default createMultiProduct;
