const assert = require('assert')

const api = require('../src/apiExample')
const PasswordHelper = require('../src/helpers/passwordHelper')
const Context = require('../src/database/strategies/base/contextStrategy')
const PostgreSQL = require('../src/database/strategies/postgresql/postgresql')
const UserSchema = require('../src/database/strategies/postgresql/schemas/userSchema')

let app = {}
let postgresql = {}

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlbXVlbCIsImlkIjoxLCJpYXQiOjE1ODgyNzAxODN9.il-xR9I6iBMc-JLPtV0tmSOwce-WNCIXheK0j8cPnwE'

describe('Suíte de Testes', () => {
    before(async () => {
        app = await api

        const connectionPostgreSQL = await PostgreSQL.connect()
        const model = await PostgreSQL.defineModel(connectionPostgreSQL, UserSchema)
        postgresql = new Context(new PostgreSQL(connectionPostgreSQL, model))
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

    it('deve cadastrar um herói', async () => {
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
            method: 'GET', headers: {
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
        const user = {
            username: 'lemuel',
            password: '$2a$04$wc9XSW/VxKobUqD/jbEgpOSjNdpH/I5oClr5pK2PfdLnaqSobYqXm'
        }

        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: user
        })

        const statusCode = result.statusCode
        // const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        // assert.ok(dados.token.length > 10)
    })

    it('deve gerar um hash a partir de uma senha', async () => {
        const password = 'lemuel2020'

        const result = await PasswordHelper.hashPassword(password)

        assert.ok(result.length > 10)
    })

    it('deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(
            'lemuel2020',
            '$2a$04$wc9XSW/VxKobUqD/jbEgpOSjNdpH/I5oClr5pK2PfdLnaqSobYqXm'
        )

        assert.ok(result)
    })

    it.only('deve retornar não autorizado ao tentar obter um login errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'lemuel',
                password: '1236'
            }
        })

        assert.deepEqual(result.statusCode, 401)
        // assert.deepEqual(dados.error, "")
    })
})