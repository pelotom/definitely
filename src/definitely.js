export default obj => typeof Proxy === 'undefined' ? obj : new Proxy(obj, {
  get(target, key) {
    if (!(key in target)) {
      const err = new Error(`attempted to access nonexistent property \`${key}\``)
      err.stack = err.stack.replace(/(\n\s*at[^\n]*){2}/, '')
      throw err
    }
    return target[key]
  }
})
