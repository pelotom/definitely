export default (
  obj,
  {
    whitelist = []
  } = {}
) => {

  if (obj === null)
    return obj

  switch (typeof obj) {
    case 'undefined':
    case 'boolean':
    case 'number':
    case 'string':
      return obj
  }

  if (typeof Proxy === 'undefined')
    return obj

  const whiteset = {}
  for (let i = 0; i < whitelist.length; i++)
    whiteset[whitelist[i]] = null

  return new Proxy(obj, {
    get(target, key) {
      if (!(key in target || key in whiteset)) {
        const err = new Error(`attempted to access nonexistent property \`${key}\``)
        // Remove our stack frames from the trace leaving only client code
        err.stack = err.stack.replace(/(\n[^\n]*definitely\/src\/definitely\.js[^\n]*)/g, '')
        throw err
      }
      return target[key]
    }
  })
}
