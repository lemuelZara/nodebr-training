const InterfaceCRUD = require('./interfaces/interfaceCrud')

class MongoDB extends InterfaceCRUD {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em MongoDB')
    }
}

module.exports = MongoDB