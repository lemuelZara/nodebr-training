class ContextStrategy {
    constructor(strategy) {
        this._database = strategy
    }

    static connect() {
        return this._database.connect()
    } 
    
    isConnected() {
        return this._database.isConnected()
    }

    create(item) {
        return this._database.create(item)
    }

    read(query) {
        return this._database.read(query)
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id) {
        return this._database.delete(id)
    }
}

module.exports = ContextStrategy