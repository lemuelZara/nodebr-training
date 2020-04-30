const Joi = require('joi')
const Jwt = require('jsonwebtoken')

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
                tags: ['api'],
                description: 'Deve listar os Heróis',
                notes: 'Pode paginar resultados e filtrar por nome',
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
                tags: ['api'],
                description: 'Deve cadastrar os Heróis',
                notes: 'Deve cadastrar um Herói com nome e poder',
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
                tags: ['api'],
                description: 'Deve atualizar os Heróis',
                notes: 'Pode atualizar qualquer campo',
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

                tags: ['api'],
                description: 'Deve remover os Heróis',
                notes: 'O ID tem que ser válido',
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