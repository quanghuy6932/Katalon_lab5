class Calculator {
  _validate(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Inputs must be numbers');
  }
  add(a, b) { this._validate(a, b); return a + b; }
  subtract(a, b) { this._validate(a, b); return a - b; }
  multiply(a, b) { this._validate(a, b); return a * b; }
  divide(a, b) {
    this._validate(a, b);
    if (b === 0) throw new Error('Cannot divide by zero');
    return a / b;
  }
  isEven(n) { return n % 2 === 0; }
  factorial(n) {
    if (n < 0) throw new Error('Factorial for negative numbers is not defined');
    return n <= 1 ? 1 : n * this.factorial(n - 1);
  }
  fibonacci(n) {
    if (n <= 0) return [];
    let series = [0, 1];
    for (let i = 2; i < n; i++) series.push(series[i - 1] + series[i - 2]);
    return series.slice(0, n);
  }
}
module.exports = Calculator;