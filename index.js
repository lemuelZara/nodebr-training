const dadosAlteracao = { nome: 'Carlinhos' }

const numbersOne = [
    { id: 1, nome: 'Paulo' },
    { id: 12, nome: 'Lemuel' },
    { id: 1, nome: 'Josefina' },
    { id: 1, nome: 'Josefina' },
    { id: 12, nome: 'Jose' },
    { id: 20, nome: 'Lidol' },
    { id: 1, nome: 'Paulo' },
    { id: 15, nome: 'Antonio' },
    { id: 1, nome: 'Gaules' },
]

const result = numbersOne.map((number, index) => {
    return number.id === 1 ? index : null
})

if (result.every(item => item === null)) {
    console.log('Todos tem null')
} else {
    const novosDados = numbersOne.filter(number => {
        return number.id === 15
    })

    const newData = []

    for (const [, value] of novosDados.entries()) {
        newData.push(value)
    }

    console.log('newData: ', ...newData)
    console.log('dadosAlteracao: ', { ...dadosAlteracao })

    const dadosParaAlteracao = {
        ...newData,
        ...dadosAlteracao
    }

    // { id: 4, nome: 'Superman', poder: 'Super velocidade' }
    // { nome: 'Flash' }
    // { id: 4, nome: 'Flash', poder: 'Super velocidade' }

    console.log('dadosParaAlteracao: ', dadosParaAlteracao)
    /* for (let i = numbersOne.length - 1; i >= 0; i--) {
        if (numbersOne[i].id === 1) numbersOne.splice(i, 1)
    } */

    console.log('numbersOne: ', numbersOne)
}

