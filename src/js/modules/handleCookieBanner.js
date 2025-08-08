const loadScript = (src) =>
  new Promise((res) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = res;
    document.head.appendChild(s);
  });

const handleCookieBanner = async () => {
  await loadScript("https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js");
  await loadScript("https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js");
  const STOREFRONT_DOMAIN = "caffeinearmy.com.br";
  const CHECKOUT_DOMAIN = "caffeinearmy.com.br";
  const SF_API_TOKEN = "c28e8facd726992d4c88fe260c9e1af6";
  try {
    privacyBanner.loadBanner({
      storefrontAccessToken: SF_API_TOKEN,
      checkoutRootDomain: CHECKOUT_DOMAIN,
      storefrontRootDomain: STOREFRONT_DOMAIN,
    });
    document.addEventListener("visitorConsentCollected", (event) => {
      const eventDetail = event.detail;
      if (eventDetail.analyticsAllowed && eventDetail.thirdPartyMarketingAllowed && eventDetail.saleOfDataAllowed) {
        console.log("allowed");
      } else {
        console.log("not-allowed");
      }
    });
  } catch (err) {
    console.warn("Error on cookie banner.", err);
  }
};

export default handleCookieBanner;
