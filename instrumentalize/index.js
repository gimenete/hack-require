require('./register-instrumentalize') // not needed if you use node -r register-instrumentalize.js ...

const example = require('./example')
example('SELECT * FROM users WHERE created_at > $1', new Date())
