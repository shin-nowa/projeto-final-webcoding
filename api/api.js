export function obterCriptomoedas() {
    return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl')
        .then(res => res.json())
        .catch(error => {
            console.error('Erro ao buscar criptomoedas:', error);
            throw error;
        });
}
