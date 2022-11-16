import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

const productShow = document.querySelector('.products');

const createList = async () => {
  const products = await fetchProductsList('computer');
  products.forEach((product) => {
    const newProduct = createProductElement(product);
    productShow.appendChild(newProduct);
  });
};

window.onload = () => {
  document.querySelector('.cep-button').addEventListener('click', searchCep);
  createList();
};
