const assert = require('assert')

const { listarHerois, cadastrarHeroi, removerHeroi } = require('../database')

const DEFAULT_ITEM_CADASTRAR = {
    id: 1,
    nome: 'Flash',
    poder: 'Speed'
}

describe('Suíte de Manipulação de Heróis', () => {
    before(async () => {
        await cadastrarHeroi(DEFAULT_ITEM_CADASTRAR)
    })

    it('deve pesquisar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR

        // Pega a 1ª posição do Array
        const [resultado] = await listarHerois(expected.id)

        assert.deepEqual(resultado, expected)
    })

    it('deve cadastrar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR

        // Pega a 1ª posição do Array
        const resultado = await cadastrarHeroi(expected)
        const [atual] = await listarHerois(expected.id)

        assert.deepEqual(atual, expected)
    })

    it('deve remover um herói por ID', async () => {
        const expected = true
        const resultado = await removerHeroi(DEFAULT_ITEM_CADASTRAR.id)

        assert.deepEqual(resultado, expected)
    })
})