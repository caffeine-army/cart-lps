const updateCartQuantity = ({ qtty, operation }) => {
  const domQuantity = document.querySelector("[cart-qtty]");
  const oldValue = +domQuantity.innerHTML || 0;

  switch (operation) {
    case "add":
      domQuantity.innerHTML = oldValue + qtty;
      break;
    case "subtract":
      domQuantity.innerHTML = oldValue - qtty;
      break;
    case "reset":
      domQuantity.innerHTML = 0
      break;
  }
};

export default updateCartQuantity;
