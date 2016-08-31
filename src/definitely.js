import * as messages from './messages'

export default obj => new Proxy(obj, {
  get(target, key) {
    if (!(key in target)) {
      const err = new Error(messages.nonexistent(key))
      err.stack = err.stack.replace(/(\n\s*at[^\n]*){2}/, '')
      throw err
    }
    return target[key]
  }
})
