import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';

const productShow = document.querySelector('.products');
const list = document.querySelector('.cart__products');

const showLoading = (type = 'load') => {
  const load = document.createElement('h1');
  if (type === 'error') {
    load.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    load.classList.add('error');
  } else {
    load.innerText = 'carregando...';
    load.classList.add('loading');
  }
  productShow.appendChild(load);
};

const hideLoading = () => document.querySelector('.loading').remove();

const buyList = async (self) => {
  const id = self.target.parentNode.firstChild.innerText;
  saveCartID(id);
  const productInfos = await fetchProduct(id);
  const projectAdd = createCartProductElement(productInfos);
  list.appendChild(projectAdd);
};

const addProductButton = () => {
  const allButtons = document.querySelectorAll('.product__add');
  allButtons.forEach((button) => {
    button.addEventListener('click', buyList);
  });
};

const addToList = (productsArray) => {
  productsArray.forEach((product) => {
    const projectAdd = createCartProductElement(product);
    list.appendChild(projectAdd);
  });
};

const loadSavedProducts = async () => {
  const productIds = getSavedCartIDs();
  const loadList = await productIds.map((id) => {
    const productInfos = fetchProduct(id);
    return productInfos;
  });

  Promise.all(loadList)
    .then((resolve) => addToList(resolve));
};

const createList = async () => {
  showLoading();
  try {
    const products = await fetchProductsList('computer');
    hideLoading();
    products.forEach((product) => {
      const newProduct = createProductElement(product);
      productShow.appendChild(newProduct);
    });
    addProductButton();
  } catch (error) {
    hideLoading();
    showLoading('error');
  }
};

window.onload = () => {
  document.querySelector('.cep-button').addEventListener('click', searchCep);
  createList();
  loadSavedProducts();
};
