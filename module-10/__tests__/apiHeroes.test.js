const assert = require('assert')

const api = require('../src/apiExample')

let app = {}

describe('Suíte de Testes', () => {
    before(async () => {
        app = await api
    })

    it('deve listar os heróis', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes?skip=0&limit=5&nome=Batman'
        })

        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
    })

    it('deve cadastrar um herói', async () => {
        const hero = { nome: 'Superman', poder: 'Força' }

        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: JSON.stringify(hero)
        })

        assert.deepEqual(result.statusCode, 200)
    })

    it('deve atualizar um herói', async () => {
        const hero = { nome: 'Mulher Maravilha', poder: 'Laço' }

        const { result: [{ _id }] } = await app.inject({
            method: 'GET',
            url: '/heroes?nome=Lanterna Verde'
        })

        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${_id}`,
            payload: JSON.stringify(hero)
        }) 

        assert.deepEqual(result.statusCode, 200)
    })

    it.only('deve remover um herói', async () => {
        const { result: [{ _id }] } = await app.inject({
            method: 'GET',
            url: '/heroes?nome=Lanterna Verde'
        })

        const result = await app.inject({
            method: 'DELETE',            
            url: `/heroes/${_id}`,
        })
        console.log('result', result.statusCode)
        assert.deepEqual(result.statusCode, 200)
    })
})