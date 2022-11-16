export const fetchProduct = async (ID) => {
  if (!ID) throw new Error('ID não informado');
  const selectedProduct = await fetch(`https://api.mercadolibre.com/items/${ID}`);
  return selectedProduct.json();
};

export const fetchProductsList = async (QUERY) => {
  if (!QUERY) throw new Error('Termo de busca não informado');
  const products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
  const productlist = await products.json();
  return productlist.results;
};
