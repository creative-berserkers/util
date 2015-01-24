var Mocha = require('mocha')

var mocha = new Mocha()

mocha.addFile('./test.util.js')

mocha.run(function(){})