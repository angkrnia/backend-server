const bcrypts = require('bcryptjs')

function hashPassword (password) {
  const salt = bcrypts.genSaltSync(8)
  const hash = bcrypts.hashSync(password, salt)
  return hash
}

function comparePassword (passwordLogin, passwordDatabase) {
  return bcrypts.compareSync(passwordLogin, passwordDatabase)
}

module.exports = {
  hashPassword,
  comparePassword
}