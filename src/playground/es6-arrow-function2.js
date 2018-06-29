const multiplier = {
    numbers: [1,2,3,4,5],
    multiplyBy: 100,
    multiply() {
        return this.numbers.map((num) => num * this.multiplyBy);
    }
};

console.log(multiplier.multiply());