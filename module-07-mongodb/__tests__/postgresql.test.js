const assert = require('assert')

const PostgreSQL = require('../src/database/strategies/postgresql')
const Context = require('../src/database/strategies/base/contextStrategy')

const postgresqlContext = new Context(new PostgreSQL())

describe('Postgres Strategy', () => {
    before(async () => {
        await postgresqlContext.connect()
    })

    after(() => {
        console.log('exit')
    })

    it('deve conectar com o banco de dados PostgreSQL', async () => {
        const result = await postgresqlContext.isConnected()

        assert.equal(result, true)
    })

    it('deve cadastrar um registro na tb_heroes', async () => {
        const hero = { nome: 'Superman', poder: 'Força' }

        const { nome, poder } = await postgresqlContext.create(hero)

        assert.deepEqual({ nome, poder }, hero)
    })

    it('deve listar os registros da tb_heroes', async () => {
        const result = await postgresqlContext.read({ nome: 'Gavião Negro' })

        assert.ok(result !== null)
    })

    it('deve atualizar um herói da tb_heroes', async () => {
        const hero = { nome: 'Doutor Estranho', poder: 'Magia' }

        const [heroUpdateId] = await postgresqlContext.read()

        const [qtd, [{ dataValues: { nome, poder } }]] = await postgresqlContext.update(heroUpdateId.id, hero)

        assert.deepEqual(hero, { nome, poder })
    })

    it('deve remover um herói pelo id da tb_heroes', async () => {
        const hero = { nome: 'Doutor Estranho' }

        const [heroRemove] = await postgresqlContext.read({ nome: hero.nome })
        const result = await postgresqlContext.delete(heroRemove.id)

        assert.deepEqual(result, 1)
    })
})