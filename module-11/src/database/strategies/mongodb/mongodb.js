const mongoose = require('mongoose')

const InterfaceCRUD = require('../interfaces/interfaceCrud')

const connectionState = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
    4: 'Invalid Credentials'
}

class MongoDB extends InterfaceCRUD {
    constructor(connection, schema) {
        super()

        this._connection = connection
        this._schema = schema
    }

    async isConnected() {
        const state = connectionState[this._connection.readyState]

        if (state === 'Connected') return state

        if (state === 'Connecting')
            await new Promise(resolve => setTimeout(resolve, 1000))

        return connectionState[this._connection.readyState]
    }

    static connect() {
        mongoose.connect(
            `mongodb://${encodeURIComponent('dev_user@1')}:user1@localhost:27017/heroes`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            error => {
                if (!error) return
                console.log('Erro na conexão: ', error)
            }
        )

        mongoose.connection.once('open', () => {
            console.log('Database conectado!')
        })

        return mongoose.connection
    }

    create(item) {
        return this._schema.create(item)
    }

    read(query = {}, skip = 0, limit = 10) {
        return this._schema.find(query).skip(skip).limit(limit)
    }

    update(id, hero) {
        return this._schema.findByIdAndUpdate(id, hero, {
            new: true
        })
    }

    delete(id) {
        return this._schema.findByIdAndRemove(id, {
            select: ['_id']
        })
    }
}

module.exports = MongoDB