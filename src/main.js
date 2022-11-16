import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

const productShow = document.querySelector('.products');

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

const createList = async () => {
  showLoading();
  try {
    const products = await fetchProductsList('computer');
    hideLoading();
    products.forEach((product) => {
      const newProduct = createProductElement(product);
      productShow.appendChild(newProduct);
    });
  } catch (error) {
    hideLoading();
    showLoading('error');
  }
};

window.onload = () => {
  document.querySelector('.cep-button').addEventListener('click', searchCep);
  createList();
};
