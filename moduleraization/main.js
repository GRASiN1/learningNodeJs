/*
when there are lots of function it is a good practice to divide and separate those function into modules
and import them wherever you need them and then use them
to import any library function you simply right
const <variableName> = require('<libraryName>');
but to import from a module you created you must give relative path
const <variableName> = require('./<libraryName>');
*/
const { add } = require('./math');
console.log(add(5, 4));