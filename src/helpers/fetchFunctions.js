export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (QUERY) => {
  if (typeof QUERY === 'undefined') throw new Error('Termo de busca não informado');
  const products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
  const productlist = await products.json();
  return productlist.results;
};
