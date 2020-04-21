const axios = require('axios')

const api = axios.create({
    baseURL: 'https://swapi.dev/api/'
})

const obterPessoas = async nome => {
    const { data } = await api.get('/people/', {
        params: {
            search: nome
        }
    })

    return data
}

module.exports = { obterPessoas }