import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toEqual('function');
  });

  it('fetch é chamado ao executar fetchProductsList', () => {
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    const list = await fetchProductsList('computador');
    expect(list).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('verifica se a função fetchProductsList retorna um objeto igual a computadorSearch', async () => {
    const list = await fetchProductsList('computador');   
    expect(list).toEqual(computadorSearch);
  });

  it('verifica se a função fetchProductsList retorna erro caso não se passe arguemnto', async () => {
    const list = await fetchProductsList('computador');     
    expect(list).toThrow('Termo de busca não informado');
  });  
});
