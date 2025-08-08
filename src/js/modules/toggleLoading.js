const body = document.body;

const loadingDiv = document.createElement("div");
const loadingP = document.createElement("p");
loadingP.innerHTML = "Oops, parece que encontramos um problema.<br>Enquanto resolvemos isso, iremos te redirecionar ao nosso site.";
loadingP.id = "error-message-modal";
const loadingSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width=100 fill="none" viewBox="0 0 15 24"><path fill="#D1986D" d="m5.212 18.669 3.822-9.23a7.323 7.323 0 0 0 .161-4.504C8.615 2.852 6.626 1.54 5.52.829a.041.041 0 0 0-.063.032 19.407 19.407 0 0 1-1.64 7.25.042.042 0 0 1-.048.019.041.041 0 0 1-.028-.044c.1-.542.066-1.1-.098-1.626a3.5 3.5 0 0 0-1.155-1.334.04.04 0 0 0-.063.03 8.032 8.032 0 0 1-.782 2.962C-1.149 15.001 3.277 18.1 5.168 18.69a.037.037 0 0 0 .044-.021Zm5.443-9.678a.038.038 0 0 0-.048.02L4.919 22.75a.036.036 0 0 0 .001.03.037.037 0 0 0 .01.012.038.038 0 0 0 .013.007c9.953 2.794 13.755-10.67 5.712-13.805"/></svg>';
loadingDiv.innerHTML = loadingSvg;
loadingDiv.appendChild(loadingP);
loadingDiv.classList.add("loading-screen");
body.appendChild(loadingDiv);

const toggleLoading = () => {
  if (!document.querySelector(".loading-screen")) body.appendChild(loadingDiv);
  body.classList.toggle("loading");
};

export default toggleLoading;
