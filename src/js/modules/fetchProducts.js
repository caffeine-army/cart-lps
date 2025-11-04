import { setData } from "./appData.js";
import getApiEndpoint from "./getApiEndpoint.js";

const fetchProducts = async (productInfo) => {
  const productIds = productInfo.map((el) => el.id);
  try {
    const response = await fetch(getApiEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "c28e8facd726992d4c88fe260c9e1af6"
      },
      body: JSON.stringify({
        query: `{
            nodes(ids: [${productIds.map((id) => `"gid://shopify/Product/${id}"`)}]) {
              ... on Product {
                id
                title
                availableForSale
                options {
                  optionValues {
                    name
                  }
                }
                variants(first: 100) {
                  nodes {
                    availableForSale
                    id
                    title
                    image {
                      url
                    }
                    price {
                      amount
                    }
                    selectedOptions {
                      value
                    }
                  }
                }
              }
            }
          }`,
      }),
    });
    const data = await response.json();
    data.data.nodes.forEach((el) => {
      if (!el.availableForSale) console.error(`${el.title} out of stock.`);
      el.variants = el.variants.nodes;
      el.options = el.options.map((option) => option.optionValues.map((option) => option.name));
      const info = productInfo.find((info) => el.id.includes(info.id));
      info.variants?.forEach((variant) => {
        el.variants = el.variants.filter((filteredVariant) => filteredVariant.id.includes(variant));
      });
    });
    setData(data.data.nodes);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default fetchProducts;
