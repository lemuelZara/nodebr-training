const Sequelize = require('sequelize').Sequelize
const Types = require('sequelize').DataTypes

const connection = new Sequelize(
    'heroes',
    'lemuel',
    'lemuel',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
    })

async function main() {
    const heroes = connection.define('heroes', {
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

    await heroes.sync()

    // Cadastrando um Herói na tabela
    /* await heroes.create({
        nome: 'Lanterna Verde',
        poder: 'Anel'
    }) */

    const result = await heroes.findAll({ 
        raw: true,
        attributes: ['nome']
    })

    console.log('[findAll] = ', result)
}

main()