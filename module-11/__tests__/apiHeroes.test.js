const assert = require('assert')

const api = require('../src/apiExample')

let app = {}

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlbXVlbCIsImlkIjoxLCJpYXQiOjE1ODgyNzAxODN9.il-xR9I6iBMc-JLPtV0tmSOwce-WNCIXheK0j8cPnwE'

describe('Suíte de Testes', () => {
    before(async () => {
        app = await api
    })

    it('deve listar os heróis', async () => {
        const result = await app.inject({
            method: 'GET',
            headers: {
                Authorization: TOKEN
            },
            url: '/heroes?skip=0&limit=5&nome=Batman'
        })

        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
    })

    it.only('deve cadastrar um herói', async () => {
        const hero = { nome: 'Cyborg', poder: 'Tecnologia' }

        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            headers: {
                Authorization: TOKEN
            },
            payload: JSON.stringify(hero)
        })

        assert.deepEqual(result.statusCode, 200)
    })

    it('deve atualizar um herói', async () => {
        const hero = { nome: 'Mulher Maravilha', poder: 'Laço' }

        const { result: [{ _id }] } = await app.inject({
            method: 'GET',headers: {
                Authorization: TOKEN
            },
            url: '/heroes?nome=Superman'
        })

        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${_id}`,
            payload: JSON.stringify(hero)
        }) 

        assert.deepEqual(result.statusCode, 200)
    })

    it('deve remover um herói', async () => {
        const { result: [{ _id }] } = await app.inject({
            method: 'GET',
            headers: {
                Authorization: TOKEN
            },
            url: '/heroes?nome=Superman'
        })

        const result = await app.inject({
            method: 'DELETE',            
            url: `/heroes/${_id}`,
        })
        console.log('result', result.statusCode)
        assert.deepEqual(result.statusCode, 200)
    })

    it('deve obter um token JWT', async () => {
        const user = { username: 'lemuel', password: '123' }

        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: JSON.stringify(user)
        })

        console.log('result', result.result)

        const statusCode = result.statusCode
        // const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        // assert.ok(dados.token.length > 10)
    })
})