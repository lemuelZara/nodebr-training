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

main()
async function main() {
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()

        const result = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        console.log(JSON.stringify({
            usuario,
            telefone: result[0],
            endereco: result[1]
        }))
        console.timeEnd('medida-promise')
    } catch (error) {
        console.error('Deu erro!', error)
    }
}

