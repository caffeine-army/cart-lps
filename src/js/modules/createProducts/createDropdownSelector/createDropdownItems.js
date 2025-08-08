import { setProduct } from "../../appData.js";

const createDropdownItems = ({ product, image, dropdownText, dropdownVariantsWrapper }) => {
  let hasChecked = false;
  product.variants.forEach((variant) => {
    const buttonWrapper = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const ball = document.createElement("span");
    const text = document.createElement("span");

    input.type = "radio";
    input.id = `${product.id}-${variant.id}`;
    input.name = `${product.id}`;
    input.value = variant.id;
    input.setAttribute("hidden", "hidden");

    if (!variant.availableForSale) {
      input.setAttribute("disabled", "disabled");
    } else if (!hasChecked) {
      setProduct({ product, variant });
      input.checked = true;
      hasChecked = true;
      dropdownText.innerHTML = variant.title;
    }

    input.addEventListener("change", () => {
      setProduct({ product, variant });
      image.src = variant.image.url;
      image.alt = variant.title;
      dropdownText.innerHTML = variant.title;
    });

    label.setAttribute("for", `${product.id}-${variant.id}`);
    label.role = "button";

    text.innerHTML = variant.title;

    buttonWrapper.classList.add("button-wrapper");
    ball.classList.add("label-ball");
    text.classList.add("label-text");
    buttonWrapper.appendChild(input);
    buttonWrapper.appendChild(label);
    label.appendChild(ball);
    label.appendChild(text);
    dropdownVariantsWrapper.appendChild(buttonWrapper);
  });
};

export default createDropdownItems;
