const assert = require('assert')

const { listarHerois } = require('../database')

const DEFAULT_ITEM_CADASTRAR = {
    id: 1,
    nome: 'Flash',
    poder: 'Speed'
}

describe('Suíte de Manipulação de Heróis', () => {
    it('deve cadastrar um herói usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR

        // Pega a 1ª posição do Array
        const [resultado] = await listarHerois(expected.id)

        assert.deepEqual(resultado, expected)
    })
})