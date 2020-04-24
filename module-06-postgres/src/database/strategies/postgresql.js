const Sequelize = require('sequelize').Sequelize
const Types = require('sequelize').DataTypes

const InterfaceCRUD = require('./interfaces/interfaceCrud')

class PostgreSQL extends InterfaceCRUD {
    constructor() {
        super()

        this._driver = null
        this._heroes = null
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'lemuel',
            'lemuel',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
            }
        )

        await this.defineModel()
    }

    async defineModel() {
        this._heroes = this._driver.define('heroes', {
            id: {
                type: Types.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: {
                type: Types.STRING,
                allowNull: false
            },
            poder: {
                type: Types.STRING,
                allowNull: false,
            }
        }, {
            tableName: 'tb_heroes',
            freezeTableName: false,
            timestamps: false
        })

        await this._heroes.sync()
    }

    async isConnected() {
        try {
            await this._driver.authenticate()

            return true
        } catch (error) {
            console.error('[Erro na conexão] = ', error)
        }
    }

    async create(item) {
        const { dataValues } = await this._heroes.create(item)

        return dataValues
    }

    async read(query = {}) {
        return await this._heroes.findAll({ raw: true, where: query })
    }

    async update(id, heroi) {
        return await this._heroes.update(heroi, {
            returning: true,
            where: { id },
        })
    }

    async delete(id) {
        return await this._heroes.destroy({
            where: id ? { id } : {}
        })
    }
}

module.exports = PostgreSQL