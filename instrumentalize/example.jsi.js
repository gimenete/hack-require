module.exports = global.__instrumentalize({"path":"/Users/gimenete/projects/drjson/require/instrumentalize/example.jsi","start":17,"end":112}, function (sql, params) {
  console.log('executing...', sql, params)
  return [{ foo: 'bar' }]
})
