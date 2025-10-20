import { getData } from "./appData.js";
import createDropdownSelector from "./createProducts/createDropdownSelector/createDropdownSelector.js";

const handleVariantsWrapper = () => {
  const wrappers = document.querySelectorAll("[variants-wrapper]");
  const data = getData();
  wrappers.forEach((wrapper) => {
    const wrapperProduct = data.find((el) => el.id.split("Product/")[1] === wrapper.getAttribute("variants-wrapper"));
    const dropdown = createDropdownSelector({ product: wrapperProduct });
    wrapper.appendChild(dropdown)
  });
};

export default handleVariantsWrapper;
