
const { sum } = require("./math");

const result = sum(1, 2);
console.log(result);

/* in math.js */
const sum = (a, b) => a + b;
module.exports = { sum };