const mongoose = require('mongoose')

const user = 'dev_user@1'
// docker exec -it 1f4ec90a6768 mongo -u dev_user@1 -p user1 --authenticationDatabase heroes
mongoose.connect(
    `mongodb://${encodeURIComponent('dev_user@1')}:user1@localhost:27017/heroes`,
    {
        useNewUrlParser: true
    },
    (error) => {
        if (!error) return
        console.log('Falha na conexão! - ', error)
    }
)

/**
 * 0 = Desconectado
 * 1 = Conectado
 * 2 = Conectando
 * 3 = Desconectando
 */

const connection = mongoose.connection
connection.once('open', () => {
    console.log('Database conectado!')
})

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

const Model = mongoose.model('heroes', HeroiSchema)

async function main() {
    const resultCadastrar = await Model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('[Resultado] = ', resultCadastrar)

    const list = await Model.find()
    console.log('[Lista dos resultado] = ', list)
}

main()