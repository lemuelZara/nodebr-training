const Joi = require('joi')
const Jwt = require('jsonwebtoken')

const Base = require('./base/base')

class Auth extends Base {
    constructor(secretKey) {
        super()

        this.secretKey = secretKey
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
            handler: async (req) => {
                const { username, password } = req.payload

                return {
                    token:Jwt.sign({
                        username: username,
                        id: 1
                    }, this.secretKey)
                }
            }
        }
    }
}

module.exports = Auth