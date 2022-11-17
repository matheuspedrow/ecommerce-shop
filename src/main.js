import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';

const productShow = document.querySelector('.products');
const list = document.querySelector('.cart__products');
const totalPrice = document.querySelector('.total-price');
let totalValue = 0;

const getAllProductsToBuy = async () => {
  const productIds = getSavedCartIDs();
  return productIds.map((id) => {
    const productInfos = fetchProduct(id);
    return productInfos;
  });
};

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

const addDelButton = ({ price }) => {
  totalValue -= price;
  totalPrice.innerText = totalValue.toFixed(2);
};

const hideLoading = () => document.querySelector('.loading').remove();

const addToList = (productsArray) => {
  productsArray.forEach((product) => {
    const projectAdd = createCartProductElement(product);
    list.appendChild(projectAdd);
    const { price } = product;
    totalValue += price;
    totalPrice.innerText = totalValue.toFixed(2);
  });
};

const updateDeleteButton = (productList) => {
  const delButton = document.querySelectorAll('.cart__product');
  delButton.forEach((product, index) => {
    product.addEventListener('click', () => {
      addDelButton(productList[index]);
    });
  });
};

const loadSavedProducts = async () => {
  const loadList = await getAllProductsToBuy();

  Promise.all(loadList)
    .then((resolve) => {
      addToList(resolve);
      updateDeleteButton(resolve);
    });
};

const buyList = async (self) => {
  const id = self.target.parentNode.firstChild.innerText;
  saveCartID(id);
  const productInfos = await fetchProduct(id);
  const projectAdd = createCartProductElement(productInfos);
  list.appendChild(projectAdd);
  const { price } = productInfos;
  totalValue += price;
  totalPrice.innerText = totalValue.toFixed(2);
  const delButton = document.querySelectorAll('.cart__product');
  delButton[delButton.length - 1].addEventListener('click', () => {
    addDelButton(productInfos);
  });
};

const addProductButton = () => {
  const allButtons = document.querySelectorAll('.product__add');
  allButtons.forEach((button) => {
    button.addEventListener('click', buyList);
  });
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
