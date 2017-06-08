const fs = require('fs')
const falafel = require('falafel')
const chalk = require('chalk')

global.__instrumentalize = function (info, fn) {
  const self = this
  const { path, start, end } = info
  return function () {
    const prefix = `${chalk.blue(path)} [${chalk.green(start)}:${chalk.green(end)}]`
    const time = Date.now()
    console.log(`${prefix} Invoked with arguments:\n`, Array.prototype.slice.apply(arguments))
    const value = fn.apply(self, arguments)
    console.log(`${prefix} Returned after ${Date.now() - time}ms:\n`, value)
    return value
  }
}

require.extensions['.jsi'] = (module, path) => {
  const src = fs.readFileSync(path, 'utf8')
  const output = falafel(src, (node) => {
    if (node.type === 'FunctionExpression') {
      const { start, end } = node
      const info = { path, start, end }
      node.update(`global.__instrumentalize(${JSON.stringify(info)}, ${node.source()})`)
    }
  })
  const finalPath = path + '.js'
  fs.writeFileSync(finalPath, output, 'utf8')
  return require.extensions['.js'](module, finalPath)
}
