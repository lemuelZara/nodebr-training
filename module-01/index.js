/**
 * Obter um usuário
 * Obter o número de telefone de um usuário a partir de seu ID
 * Obter o endereço do usuário pelo ID
 */
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

const obterUsuario = () => {
    // Problema -> reject
    // Sucesso  -> resolve
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                id: 1,
                nome: 'Lemuel Coelho Zara',
                dataNascimento: new Date()
            })
        }, 2000)
    })
}

const obterTelefone = idUsuario => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                telefone: '99787-6822',
                ddd: 17
            })
        }, 3000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(
            null,
            {
                rua: 'José Salvioni',
                numero: '1659',
                cidade: 'Meridiano'
            })
    }, 2000)
}

const usuarioPromisse = obterUsuario()

usuarioPromisse
    .then(response => {
        return obterTelefone(response.id)
            .then(responseTel => {
                return {
                    responseUser: response,
                    responseTel
                }
            })
    })
    .then(response => {
        const endereco = obterEnderecoAsync(response.id)
        return endereco
            .then(responseEnd => {
                return {
                    usuario: response.responseUser,
                    telefone: response.responseTel,
                    endereco: responseEnd
                }
            })
    })
    .then(response => {
        console.log('Usuário: ', response)
    })
    .catch(err => {
        console.error('Error: ', err)
    })

/*obterUsuario((err, usuario) => {
    // null || "" || 0 === false
    if (err) {
        console.error('Error!')
        return
    }

    obterTelefone(usuario.id, (err, telefone) => {
        if (err) {
            console.error('Error!')
            return
        }

        obterEndereco(usuario.id, (err, endereco) => {
            if (err) {
                console.error('Error!')
                return
            }

            console.log(`
            Nome: ${usuario.nome},
            Endereço: ${endereco.rua} - ${endereco.numero}
            Telefone: ${telefone.ddd} ${telefone.telefone}
            `)
        })
    })
})*/
