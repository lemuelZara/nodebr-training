const hapi = require('hapi')

const Context = require('./database/strategies/base/contextStrategy')
const MongoDB = require('./database/strategies/mongodb/mongodb')
const HeroSchema = require('./database/strategies/mongodb/schemas/heroSchema')
const Hero = require('./routes/hero')

const app = new hapi.Server({
    port: 6500
})

function mapRoutes(instance, methods) {
    return methods.map(method => {
        return instance[method]()
    })
}

async function main() {
    const connection = MongoDB.connect()
    const mongodbContext = new Context(new MongoDB(connection, HeroSchema))

    app.route([
        ...mapRoutes(new Hero(mongodbContext), Hero.methods()),
    ])

    await app.start()

    return app
}

module.exports = main()