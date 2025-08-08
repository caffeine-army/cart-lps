import { getData } from "./appData.js";

const filterProducts = (productsProperties) => {
  const products = getData();
  return products.filter((filteredProd) => productsProperties.some((property) => filteredProd.id.includes(property.id))).map((prod) => ({ ...prod, properties: productsProperties.find((property) => prod.id.includes(property.id)) }));
};

export default filterProducts;
