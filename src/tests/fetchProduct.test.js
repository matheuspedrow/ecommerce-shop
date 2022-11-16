import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('verifica se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toEqual('function');
  });

  it('verifica se fetchProduct chama a função fetch', () => {
    expect(fetchProduct('MLB1405519561')).toHaveBeenCalled();
  });  

  it('verifica se fetchProduct utiliza o endpoint correto', async () => {
    const list = await fetchProduct('MLB1405519561');
    expect(list).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });  

  it('verifica se fetchProduct retorna um produto corretamente', async () => {
    const list = await fetchProduct('MLB1405519561');
    expect(list).toEqual(product);
  });  
  it('verifica se fetchProduct retorna um erro caso não se passe parâmetro', async () => {
    const list = await fetchProduct();
    expect(list).toThrow('ID não informado');
  });   
});
