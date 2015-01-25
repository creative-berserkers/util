function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (value instanceof Array) {
                s = 'array'
            }
        }
        else {
            s = 'null';
        }
    }
    return s;
}

function copyAndEscape(src, dst, onFunction, p) {
    var path = p || []
    for (var property in src) {
        if (!src.hasOwnProperty(property)) continue

        copyAndEscapeDeep(src,dst, property, onFunction, path)
    }
}

function copyAndEscapeArray(array, dstarray, onFunction, path){
    var index = 0;
    array.forEach(function(el){
        if(typeOf(el) !== 'array' && typeOf(el) !== 'object' && typeOf(el) !== 'function'){
            dstarray.push(el)
        } else {
            var cpy = {}
            copyAndEscape(el, cpy, onFunction, path.concat(String(index++)))
            dstarray.push(cpy)
        }
    })
}

function copyAndEscapeDeep(src, dst, property, onFunction, path) {
    if (typeOf(src[property]) === 'function') {
       onFunction(path.concat(property)) 
    }
    else if (typeOf(src[property]) === 'object') {
        var cpy = {}
        copyAndEscape(src[property], cpy, onFunction, path.concat(property))
        dst[property] = cpy
    }
    else if (typeOf(src[property]) === 'array') {
        var cpyArray = []
        copyAndEscapeArray(src[property],cpyArray,onFunction,path.concat(property))
        dst[property] = cpyArray
    }
    else {
        dst[property] = src[property]
    }
}

exports.util = {
    copyAndEscape : copyAndEscape
}