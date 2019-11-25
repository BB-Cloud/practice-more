// Moves the specified amount of elements to the end of the array.

// Use Array.prototype.slice() twice to get the elements after the specified index and the elements before that. Use the spread operator(...) to combine the two into one array. If offset is negative, the elements will be moved from end to start.

const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];

let a = offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
let b = offset([1, 2, 3, 4, 5], -2); // [4, 5, 1, 2, 3]

console.log(a);
console.log(b);