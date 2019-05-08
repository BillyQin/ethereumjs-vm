const utils = require('ethereumjs-util')
const BN = utils.BN
const error = require('../exceptions.js').ERROR
const assert = require('assert')

module.exports = function (opts) {
  assert(opts.data)

  var results = {}
  // var data = opts.data

  // results.gasUsed = new BN(opts._common.param('gasPrices', 'ecdh25519computesecret'))
  results.gasUsed = new BN(12)

  if (opts.gasLimit.lt(results.gasUsed)) {
    results.return = Buffer.alloc(0)
    results.gasUsed = opts.gasLimit
    results.exceptionError = error.OUT_OF_GAS
    results.exception = 0 // 0 means VM fail (in this case because of OOG)
    return results
  }

  var data = utils.setLengthRight(opts.data, 64)

  var data1 = data.slice(0, 32)
  var data2 = data.slice(32, 64)
  console.log('9 data0', data1, data2)
  
  results.return = utils.ecdh25519computesecret(data1, data2)
  results.exception = 1

  return results
}