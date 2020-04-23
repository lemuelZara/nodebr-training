const Commander = require('commander')

const { cadastrarHeroi, listarHerois, removerHeroi, atualizarHeroi } = require('./database')

const main = async () => {
    Commander
        .version('v1')

        .option('-n, --nome [value]', 'Nome do Herói')
        .option('-p, --poder [value]', 'Poder do Herói')
        .option('-i, --id [value]', 'ID do Herói')

        .option('-c, --cadastrar', 'Cadastrar um Herói')
        .option('-l, --listar', 'Listar um Herói')
        .option('-r, --remover [value]', 'Remover um Herói por ID')
        .option('-a, --atualizar [value]', 'Atualizar um Herói por ID')

        .parse(process.argv)

    const { nome, poder, id } = Commander

    try {
        if (Commander.cadastrar) {
            const resultado = await cadastrarHeroi({ nome, poder })

            if (!resultado) {
                console.error('Erro ao cadastrar Herói!')
            }

            console.log('Herói cadastrado com sucesso!')
        }

        if (Commander.listar) {
            console.log(await listarHerois())
            return
        }

        if (Commander.remover) {
            const resultado = await removerHeroi(id)

            if (!resultado) {
                console.error('Não foi possível remover o Herói!')
                return
            }

            console.log('Herói removido com sucesso!')
        }

        if (Commander.atualizar) {
            const idAtualizar = parseInt(Commander.atualizar)
            
            const dado = JSON.stringify({ nome, poder })

            const heroiAtualizar = JSON.parse(dado)

            const resultado = await atualizarHeroi(idAtualizar, heroiAtualizar)

            if (!resultado) {
                console.error('Não foi possível atualizar o Herói')
                return
            }

            console.log('Herói atualizado com sucesso!')
        }
    } catch (error) {
        console.error('Erro: ', error)
    }
}

main()