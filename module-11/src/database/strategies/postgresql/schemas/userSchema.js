const Sequelize = require('sequelize').Sequelize
const Types = require('sequelize').DataTypes

const UserSchema = {
    name: 'usuarios',
    schema: {
        id: {
            type: Types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: Types.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Types.STRING,
            allowNull: false,
        }
    },
    options: {
        tableName: 'tb_users',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = UserSchema