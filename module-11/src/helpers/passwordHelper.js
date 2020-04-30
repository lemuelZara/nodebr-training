const Bcrypt = require('bcryptjs')

class PasswordHelper {
    static async hashPassword(password) {
        return Bcrypt.hashSync(password, 3)
    }
    
    static async comparePassword(password, hash) {
        return Bcrypt.compareSync(password, hash)
    }
}

module.exports = PasswordHelper