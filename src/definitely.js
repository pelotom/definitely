export default (
  obj,
  {
    whitelist = []
  } = {}
) => {

  const whiteset = {}
  for (let i = 0; i < whitelist.length; i++)
    whiteset[whitelist[i]] = null

  if (typeof Proxy === 'undefined')
    return obj

  return new Proxy(obj, {
    get(target, key) {
      if (!(key in target || key in whiteset)) {
        const err = new Error(`attempted to access nonexistent property \`${key}\``)
        err.stack = err.stack.replace(/(\n\s*at[^\n]*){2}/, '')
        throw err
      }
      return target[key]
    }
  })
}
