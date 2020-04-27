const mongoose = require('mongoose')

const InterfaceCRUD = require('./interfaces/interfaceCrud')

const connectionState = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
    4: 'Invalid Credentials'
}

class MongoDB extends InterfaceCRUD {
    constructor() {
        super()

        this._heroiSchema = null
        this._driver = null
    }

    async isConnected() {
        const state = connectionState[this._driver.readyState]

        if (state === 'Connected') return state

        if (state === 'Connecting')
            await new Promise(resolve => setTimeout(resolve, 1000))

        return connectionState[this._driver.readyState]
    }

    connect() {
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

        this._driver = mongoose.connection
        this.defineModel()
    }

    defineModel() {
        const HeroiSchema = new mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })

        this._heroiSchema = mongoose.model('heroes', HeroiSchema)
    }

    create(item) {
        return this._heroiSchema.create(item)
    }

    read(query = {}) {
        return this._heroiSchema.find(query)
    }

    update(id, hero) {
        return this._heroiSchema.findByIdAndUpdate(id, hero, {
            new: true
        })
    }

    delete(id) {
        return this._heroiSchema.findByIdAndRemove(id, {
            select: ['_id']
        })
    }
}

module.exports = MongoDB