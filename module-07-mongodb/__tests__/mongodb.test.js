const assert = require('assert')

const MongoDB = require('../src/database/strategies/mongodb')
const Context = require('../src/database/strategies/base/contextStrategy')

const mongodbContext = new Context(new MongoDB())

describe('MongoDB: Suíte de Testes', () => {
    before(async () => {
        await mongodbContext.connect()
    })

    it('verificar conexão do MongoDB', async () => {
        const result = await mongodbContext.isConnected()

        assert.deepEqual(result, 'Connected')
    })

    it('deve cadastrar um herói', async () => {
        const heroi = { nome: 'Lanterna Verde', poder: 'Anel' }

        const { nome, poder } = await mongodbContext.create(heroi)

        assert.deepEqual(heroi, { nome, poder })
    })

    it('deve listar os heróis', async () => {
        const heroi = { nome: 'Batman', poder: 'Dinheiro' }

        const [{ nome, poder }] = await mongodbContext.read({ nome: heroi.nome })

        assert.deepEqual(heroi, { nome, poder })
    })

    it('deve atualizar um herói', async () => {
        const heroi = { nome: 'Zed', poder: 'Sombras' }

        const [{ _id }] = await mongodbContext.read()

        const { nome, poder } = await mongodbContext.update(_id, heroi)

        assert.deepEqual({ nome, poder }, heroi)
    })

    it.only('deve remover um herói', async () => {
        const heroi = { nome: 'Zed' }

        const [{ _id }] = await mongodbContext.read({ nome: heroi.nome })

        const result = await mongodbContext.delete(_id)
        
        assert.deepEqual(_id, result._id)
    })
})