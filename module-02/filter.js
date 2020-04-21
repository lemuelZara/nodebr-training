const { obterPessoas } = require('./service')

Array.prototype.meuFilter = function (callback) {
    const novaLista = []

    // O this é o Array que estou passando
    for (const [index, value] of this.entries()) {
        const resultado = callback(value, index, this)

        if (!resultado) {
            continue
        } else {
            novaLista.push(value)
        }
    }

    return novaLista
}

async function main() {
    try {
        const { results } = await obterPessoas('a')

        const familiaLars = results.meuFilter(pessoa => pessoa.name.toLowerCase().indexOf('lars') !== -1)

        console.log(familiaLars.map(item => item.name))
    } catch (error) {
        console.error('Erro:', error)
    }
}

main()