const handleError = () => {
  document.body.classList.add("error");
  setTimeout(() => {
    window.location.href = "https://www.caffeinearmy.com.br/";
  }, 3000);
};

export default handleError;
