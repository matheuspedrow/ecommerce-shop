import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

const productShow = document.querySelector('.products');

const showLoading = () => {
  const load = document.createElement('h1');
  load.innerText = 'carregando...';
  load.classList.add('loading');
  productShow.appendChild(load);
};

const hideLoading = () => document.querySelector('.loading').remove();

const createList = async () => {
  showLoading();
  const products = await fetchProductsList('computer');
  hideLoading();
  products.forEach((product) => {
    const newProduct = createProductElement(product);
    productShow.appendChild(newProduct);
  });
};

window.onload = () => {
  document.querySelector('.cep-button').addEventListener('click', searchCep);
  createList();
};
