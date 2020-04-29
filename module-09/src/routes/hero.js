const Joi = require('joi')

const Base = require('./base/base')

class Hero extends Base {
    constructor(database) {
        super()

        this.database = database
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            config: {
                validate: {
                    // Payload = body
                    // Headers = header
                    // Params = vindos da URL
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query

                    let query = nome ? {
                        nome: { $regex: `.*${nome}.*` }
                    } : {}

                    return this.database.read(query, skip, limit)
                } catch (error) {
                    console.error('Erro ao listar: ', error)
                    return 'Erro interno!'
                }
            }
        }
    }

    create() {
        return {
            method: 'POST',
            path: '/heroes',
            config: {
                validate: {
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(3).max(20)
                    }
                }
            },
            handler: async (request) => {
                const { nome, poder } = request.payload

                const result = await this.database.create({ nome, poder })

                return result
            }
        }
    }

    update() {
        return {
            path: '/heroes/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(3).max(20)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params

                    const { payload } = request

                    const dados = JSON.parse(JSON.stringify(payload))

                    const result = await this.database.update(id, dados)

                    return result
                } catch (error) {
                    console.error('Erro ao atualizar: ', error)

                    return "Erro ao atualizar"
                }
            }
        }
    }

    delete() {
        return {
            path: '/heroes/{id}',
            method: 'DELETE',
            config: {
                validate: {
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params

                    const result = await this.database.delete(id)

                    return result
                } catch (error) {
                    console.error('Erro ao exlcuir: ', error)

                    return "Erro ao exlcuir"
                }
            }
        }
    }
}

module.exports = Hero