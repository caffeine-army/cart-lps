const firePageLoad = () => {
  try {
    TriplePixel("pageLoad");
  } catch (e) {
    console.error(e);
  }
};

export default firePageLoad;
