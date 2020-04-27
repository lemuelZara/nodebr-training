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
})