const Hapi = require('hapi')

const Vision = require('vision')
const Inert = require('inert')
const HapiSwagger = require('hapi-swagger')

const Context = require('./database/strategies/base/contextStrategy')
const MongoDB = require('./database/strategies/mongodb/mongodb')
const HeroSchema = require('./database/strategies/mongodb/schemas/heroSchema')
const Hero = require('./routes/hero')

const app = new Hapi.Server({
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

    await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'API Herois - #CursoNodeBR',
                    version: 'v1.0'
                }
            }
        }
    ])

    app.route(mapRoutes(new Hero(mongodbContext), Hero.methods()))

    await app.start()

    return app
}

module.exports = main()