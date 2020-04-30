const Joi = require('joi')
const Jwt = require('jsonwebtoken')
const Boom = require('boom')

const Base = require('./base/base')
const PasswordHelper = require('../helpers/passwordHelper')

class Auth extends Base {
    constructor(secretKey, database) {
        super()

        this.secretKey = secretKey
        this.database = database
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Login',
                notes: 'Rota de Login',
                validate: {
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (req, h) => {
                const { username, password } = req.payload

                const [user] = await this.database.read({
                    username: username
                })

                console.log('user', user)

                if (!user) {
                    return Boom.unauthorized('O usuário ou senha nao existe')
                }

                const match = await PasswordHelper.comparePassword(password, user.password)

                if (!match) {
                    return Boom.unauthorized('O usuário nao existe')
                }

                return {
                    token: Jwt.sign({
                        username: username,
                        id: user.id
                    }, this.secretKey)
                }
            }
        }
    }
}

module.exports = Auth