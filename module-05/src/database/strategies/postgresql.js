const InterfaceCRUD = require('./interfaces/interfaceCrud')

class PostgreSQL extends InterfaceCRUD {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em PostgreSQL')
    }
}

module.exports = PostgreSQL