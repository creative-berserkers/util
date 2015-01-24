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
        property.forEach(function(el){
            var cpy = {}
            copyAndEscape(el, cpy , path.concat(property), onFunction)
            cpyArray.push(cpy)
        })
        dst[property] = cpyArray
    }
    else {
        dst[property] = src[property]
    }
}

exports.util = {
    copyAndEscape : copyAndEscape
}