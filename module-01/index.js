/**
 * Obter um usuário
 * Obter o número de telefone de um usuário a partir de seu ID
 * Obter o endereço do usuário pelo ID
 */

const obterUsuario = callback => {
    setTimeout(() => {
        return callback(
            null,
            {
                id: 1,
                nome: 'Lemuel Coelho Zara',
                dataNascimento: new Date()
            })
    }, 2000)
}

const obterTelefone = (idUsuario, callback) => {
    setTimeout(() => {
        return callback(
            null,
            {
                telefone: '99787-6822',
                ddd: 17
            })
    }, 3000)
}

const obterEndereco = (idUsuario, callback) => {
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

const resolverUsuario = (err, success) => {
    console.log(success)
}

obterUsuario((err, usuario) => {
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
})
