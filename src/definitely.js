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
        // Remove our stack frames from the trace leaving only client code
        err.stack = err.stack.replace(/(\n[^\n]*definitely\/src\/definitely\.js[^\n]*)/g, '')
        throw err
      }
      return target[key]
    }
  })
}
