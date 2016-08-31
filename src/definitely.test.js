import { expect } from 'chai'

import definitely from './definitely'

describe('definitely', () => {
  const obj = {
    foo: 'bar',
    truthy: true,
    falsey: false,
    numbery: 3
  }

  before(() => {
    global.Proxy = require('harmony-proxy')
  })

  after(() => {
    delete global.Proxy
  })

  it('allows valid property access', () => {
    for (const key in obj)
      expect(definitely(obj)[key]).to.equal(obj[key])
  })

  it('disallows invalid property access', () => {
    const badKey = 'bar'
    let expectedErr
    try {
      expectedErr = new Error(`attempted to access nonexistent property \`${badKey}\``); definitely(obj)[badKey]
      throw new Error('did not throw on invalid access')
    } catch (err) {
      const removeColumn = stack => stack.replace(/(definitely\.test\.js:\d+):\d+/, '$1')
      expect(removeColumn(err.stack)).to.equal(removeColumn(expectedErr.stack))
    }
  })
})

describe('definitely without Proxy', () => {
  it('is a noop', () => {
    expect(definitely({}).meh).to.equal(undefined)
  })
})
