const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]

    for (const index of this) {
        valorFinal = callback(valorFinal, index, this)
    }

    return valorFinal
}

async function main() {
    try {
        const { results } = await obterPessoas('a')

        const pesos = results
            .map(pessoa => parseInt(pessoa.mass))
            .meuReduce((total, peso) => {
                return total + (peso = peso || 0)
            }, 0)

        console.log(pesos)
    } catch (error) {
        console.error('Erro:', error)
    }
}

main()