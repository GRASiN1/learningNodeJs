/*
to use these function you must export them using module object 
or you can also export using exports keyword
example : 
exports.add = (a,b) => return a+b;
*/
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

module.exports = { add, sub };
