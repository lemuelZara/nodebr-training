class Base {
    static methods() {
        return Object
            .getOwnPropertyNames(this.prototype)
            .filter(method => {
                return method !== 'constructor' && !method.startsWith('_')
            })
    }
}

module.exports = Base