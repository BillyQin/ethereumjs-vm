/*
 * Example - Running code on an ethereum-vm
 *
 *
 * To run this example in the browser, bundle this file
 * with browserify using `browserify index.js -o bundle.js`
 * and then load this folder onto a HTTP WebServer (e.g.
 * using node-static or `python -mSimpleHTTPServer`).
 */
var Buffer = require('safe-buffer').Buffer // use for Node.js <4.5.0
var VM = require('../../dist/index.js')

// create a new VM instance
var vm = new VM()

// var code = '7f4e616d65526567000000000000000000000000000000000000000000000000003055307f4e616d6552656700000000000000000000000000000000000000000000000000557f436f6e666967000000000000000000000000000000000000000000000000000073661005d2720d855f1d9976f88bb10c1a3398c77f5573661005d2720d855f1d9976f88bb10c1a3398c77f7f436f6e6669670000000000000000000000000000000000000000000000000000553360455560df806100c56000396000f3007f726567697374657200000000000000000000000000000000000000000000000060003514156053576020355415603257005b335415603e5760003354555b6020353360006000a233602035556020353355005b60007f756e72656769737465720000000000000000000000000000000000000000000060003514156082575033545b1560995733335460006000a2600033545560003355005b60007f6b696c6c00000000000000000000000000000000000000000000000000000000600035141560cb575060455433145b1560d25733ff5b6000355460005260206000f3'
var code = '608060405234801561001057600080fd5b50600961003a60405180606001604052806040815260200161016c604091396100be60201b60201c565b61006160405180606001604052806040815260200161012c604091396100be60201b60201c565b6040518083815260200182815260200192505050602060405180830381855afa158015610092573d6000803e3d6000fd5b5050506040513d60208110156100a757600080fd5b8101908080519060200190929190505050506100e9565b600060608290506000815114156100db576000801b9150506100e4565b60208301519150505b919050565b6035806100f76000396000f3fe6080604052600080fdfea165627a7a7230582022e39281dc06b14bb895ef2df900a49d8c31632708d618b5e89ca9ae5e55c6a500293239646538636632333164643963306139306235313665646637333035656236306465323138383739363864616536633463386631656466396434636666343065383635353166396130626433633239636435333537356133363033363334313433356434306638366364613662613237646466656539363861306336313534'
vm.on('step', function (data) {
  console.log(data.opcode.name)
})

vm.runCode({
  code: Buffer.from(code, 'hex'),
  gasLimit: Buffer.from('ffffffff', 'hex')
}, function (err, results) {
  console.log('returned: ' + results.return.toString('hex'))
  console.log('gasUsed: ' + results.gasUsed.toString())
  console.log(err)
})
