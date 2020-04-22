const { readFileSync } = require('fs')
const { promisify } = require('util')

const listarHerois = async id => {
    const dados = await obterDadosHerois()

    const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))

    return dadosFiltrados
}

const obterDadosHerois = () => {
    const arquivo = readFileSync('./herois.json', 'utf8')

    return JSON.parse(arquivo.toString())
}

const escreverHerois = () => {

}

module.exports = {
    listarHerois,
    obterDadosHerois,
    escreverHerois
}