const service = require('./service')

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    
    // O this é o Array que estou passando
    for (let index = 0; index <= this.length - 1; index++) {
        const resultado = callback(this[index], index)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado
}

async function main() {
    try {
        const response = await service.obterPessoas('r2')

        const names = response.results.meuMap(pessoa => pessoa.name)

        console.log(names)
    } catch (error) {
        console.error('Erro:', error)
    }
}

main()