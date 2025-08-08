let products = {};
let data = {};
let coupons = [];
let cartWrapper;
let inCartContainer;
let bumpContainer;

const setData = (obj) => (data = obj);
const getData = () => data;

const setInCartContainer = (el) => (inCartContainer = el);
const getInCartContainer = () => inCartContainer;

const setBumpContainer = (el) => (bumpContainer = el);
const getBumpContainer = () => bumpContainer;

const setCartWrapper = (el) => (cartWrapper = el);
const getCartWrapper = () => cartWrapper;

const getCoupons = () => coupons;
const setCoupons = (coupon) => coupons.push(coupon);
const removeCoupon = (coupon) => (coupons = coupons.filter((el) => el !== coupon));
const resetCoupons = () => (coupons = []);

const getProducts = () => products;
const setProduct = ({ product, variant }) => {
  if (!products[product.id]) products[product.id] = {};
  products[product.id].variants = {};
  products[product.id].variants[variant.id] = { quantity: product.properties?.quantity || 1 };
};
const setMultiProduct = ({ product, variant }) => {
  if (products[product.id]) {
    if (products[product.id].variants[variant.id]) products[product.id].variants[variant.id].quantity++;
    else products[product.id].variants[variant.id] = { quantity: 1 };
    return;
  }
  products[product.id] = { variants: {} };
  products[product.id].variants[variant.id] = { quantity: 1 };
};
const getProductQuantity = (productId) => products[`gid://shopify/Product/${productId}`]?.quantity || 1;
const setProductQuantity = ({ productId, quantity }) => {
  products[`gid://shopify/Product/${productId}`].quantity = quantity;
};
const setProductAsBump = ({ productId }) => (products[productId].isBump = true);
const removeProductAsBump = ({ productId }) => (products[productId].isBump = false);
const setEmptyProduct = (product) => {
  products[product.id] = { variants: {} };
};
const removeProductVariant = ({ product, variant }) => {
  products[product.id].variants[variant.id].quantity--;
  if (products[product.id].variants[variant.id].quantity <= 0) delete products[product.id].variants[variant.id];
};
const resetProducts = () => (products = {});

export { setData, getData, setCartWrapper, getCartWrapper, setInCartContainer, getInCartContainer, setBumpContainer, getBumpContainer, setProduct, getProducts, setEmptyProduct, setMultiProduct, setProductQuantity, getProductQuantity, removeProductVariant, setProductAsBump, removeProductAsBump, setCoupons, getCoupons, removeCoupon, resetCoupons, resetProducts };
