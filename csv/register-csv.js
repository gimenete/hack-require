const fs = require('fs')

require.extensions['.csv'] = (module, path) => {
  const raw = fs.readFileSync(path, 'utf8')
  const lines = raw.split('\n')
  module.exports = lines.map(line => line.split(','))
}
