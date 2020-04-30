const Sequelize = require('sequelize').Sequelize
const Types = require('sequelize').DataTypes

const InterfaceCRUD = require('../interfaces/interfaceCrud')

class PostgreSQL extends InterfaceCRUD {
    constructor(connection, schema) {
        super()

        this._connection = connection
        this._schema = schema
    }

    static async connect() {
        const connection = new Sequelize(
            'heroes',
            'lemuel',
            'lemuel',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                logging: false
            }
        )

        return connection
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()

        return model
    }

    async isConnected() {
        try {
            await this._connection.authenticate()

            return true
        } catch (error) {
            console.error('[Erro na conexão] = ', error)
        }
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item)

        return dataValues
    }

    async read(query = {}) {
        return await this._schema.findAll({ raw: true, where: query })
    }

    async update(id, heroi) {
        return await this._schema.update(heroi, {
            returning: true,
            where: { id },
        })
    }

    async delete(id) {
        return await this._schema.destroy({
            where: id ? { id } : {}
        })
    }
}

module.exports = PostgreSQL