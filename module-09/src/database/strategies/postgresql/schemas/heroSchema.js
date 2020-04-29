const Sequelize = require('sequelize').Sequelize
const Types = require('sequelize').DataTypes

const HeroSchema = {
    name: 'heroes',
    schema: {
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
    },
    options: {
        tableName: 'tb_heroes',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = HeroSchema