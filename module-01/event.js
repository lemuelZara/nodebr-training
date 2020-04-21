const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'

meuEmissor.on(nomeEvento, click => {
    console.log('Um usuário clicou', click)
})

const stdin = process.openStdin()
stdin.addListener('data', value => {
    console.log('Você digitou: ', value.toString().trim())
})