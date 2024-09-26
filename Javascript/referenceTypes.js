let array, arrayRef;

array = ["first", "second", "third"]

arrayRef = array;

console.log(array[1], arrayRef[1]);

array[1] = "changed";

console.log(array[1], arrayRef[1]);