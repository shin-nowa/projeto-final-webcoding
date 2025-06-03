import { obterCriptomoedas } from '../api/api.js';

obterCriptomoedas()
    .then(data => {
        console.log(data);
        cotacaoMoeda(data);
    })
    .catch(error => console.error('Erro ao buscar criptomoedas:', error));

function cotacaoMoeda(criptos){
    const btc = criptos.find(cripto => cripto.id === "bitcoin")
    const eth = criptos.find(cripto => cripto.id === "ethereum")
    const ada = criptos.find(cripto => cripto.id === "cardano")

    const formatar = (preco) => preco.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    document.getElementById('btc-price').innerHTML = btc ? formatar(btc.current_price) : 'Não encontrado';
    document.getElementById('eth-price').innerHTML = eth ? formatar(eth.current_price) : 'Não encontrado';
    document.getElementById('ada-price').innerHTML = ada ? formatar(ada.current_price) : 'Não encontrado';
}