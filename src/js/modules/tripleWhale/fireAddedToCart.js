const fireAddedToCart = ({ products }) => {
  try {
    Object.keys(products).forEach((prodKey) => {
      const product = products[prodKey];
      const prodQuantity = product.quantity || 1;
      Object.keys(product.variants).forEach((varKey) => {
        const variant = product.variants[varKey];
        TriplePixel("AddToCart", {
          item: +prodKey.split("Product/")[1],
          q: prodQuantity * variant.quantity,
          v: +varKey.split("ProductVariant/")[1],
        });
      });
    });
  } catch (e) {
    console.error(e);
  }
};

export default fireAddedToCart;
