const service = require('./service')

async function main() {
    try {
        const names = []
        const response = await service.obterPessoas('r2')

        for (const key in response.results) {
            const { name } = response.results[key]

            names.push(name)
        }

        console.log(names)
    } catch (error) {
        console.error('Erro:', error)
    }
}

main()