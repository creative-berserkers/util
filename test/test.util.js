var chai = require('chai')
var spies = require('chai-spies')
var util = require('../lib/util.js').util

chai.use(spies)


var expect = chai.expect

describe('util', function() {
    describe('.copyAndEscape', function() {
        it('should return correct object', function(done) {

            var object = {
                position: {
                    x: 3,
                    y: 5
                },
                text: 'test',
                doSth: function() {
                    object.position.x = 5
                    object.text = 'hello world'
                    console.log('do called')
                }
            }
            var dst = {}
            util.copyAndEscape(object, dst, function(path) {
                expect(path).to.eql(['doSth'])
                done()
            })

            expect(dst).to.eql({
                position: {
                    x: 3,
                    y: 5
                },
                text: 'test'
            })
        })

        it('should return correct object with two functions', function(done) {

            var object = {
                position: {
                    x: 3,
                    y: 5
                },
                text: 'test',
                doSth: function() {
                    object.position.x = 5
                    object.text = 'hello world'
                    console.log('do called')
                },
                make: function() {

                }
            }
            var dst = {}
            var times = 0
            util.copyAndEscape(object, dst, function(path) {
                if (times === 0) {
                    expect(path).to.eql(['doSth'])
                }
                else if (times === 1) {
                    expect(path).to.eql(['make'])
                    done()
                }
                times++
            })

            expect(dst).to.eql({
                position: {
                    x: 3,
                    y: 5
                },
                text: 'test'
            })
        })
        
        it('should return correct object with simple array', function(done) {

            var object = {
                position: {
                    x: 3,
                    y: 5
                },
                players : ['player1','player2'],
                text: 'test',
                doSth: function() {
                    object.position.x = 5
                    object.text = 'hello world'
                    console.log('do called')
                }
            }
            var dst = {}
            util.copyAndEscape(object, dst, function(path) {
                expect(path).to.eql(['doSth'])
                done()
            })
            expect(dst).to.eql({
                position: {
                    x: 3,
                    y: 5
                },
                text: 'test',
                players : ['player1','player2']
            })
        })
        
        it('should return correct object with two functions and array', function(done) {

            var object = {
                position: {
                    x: 3,
                    y: 5
                },
                players : [{
                    name : 'name1',
                    move : function(){}
                },{
                    name : 'name2',
                    move : function(){}
                }],
                text: 'test',
                doSth: function() {
                    object.position.x = 5
                    object.text = 'hello world'
                    console.log('do called')
                },
                make: function() {

                }
            }
            var dst = {}
            var times = 0
            util.copyAndEscape(object, dst, function(path) {
                if (times === 0) {
                    expect(path).to.eql(['players','0', 'move'])
                }
                else if (times === 1) {
                    expect(path).to.eql(['players','1', 'move'])
                }
                else if (times === 2) {
                    expect(path).to.eql(['doSth'])
                    done()
                }
                times++
            })

            expect(dst).to.eql({
                position: {
                    x: 3,
                    y: 5
                },
                text: 'test',
                players : [{
                    name : 'name1'
                },{
                    name : 'name2'
                }]
            })
        })

        it('should return correct object with two functions when one is in deep object', function(done) {

            var object = {
                position: {
                    x: 3,
                    y: 5
                },
                text: 'test',
                doSth: function() {
                    object.position.x = 5
                    object.text = 'hello world'
                    console.log('do called')
                },
                level1: {
                    level2: {
                        make: function() {

                        }
                    }
                }
            }
            var dst = {}
            var times = 0
            util.copyAndEscape(object, dst, function(path) {
                if (times === 0) {
                    expect(path).to.eql(['doSth'])
                }
                else if (times === 1) {
                    expect(path).to.eql(['level1', 'level2', 'make'])
                    done()
                }
                times++
            })

            expect(dst).to.eql({
                position: {
                    x: 3,
                    y: 5
                },
                text: 'test',
                level1: {
                    level2: {

                    }
                }
            })

        })

    }) 
})