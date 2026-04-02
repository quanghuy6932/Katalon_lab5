const Calculator = require('../src/calculator');

describe('Unit Test: Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  it('nên thực hiện cộng, trừ, nhân, chia đúng chuẩn', () => {
    expect(calc.add(10, 5)).toBe(15);
    expect(calc.subtract(10, 5)).toEqual(5);
    expect(calc.multiply(10, 5)).toBe(50);
    expect(calc.divide(10, 5)).toBe(2);
    expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3, 5);
  });

  it('nên báo lỗi khi chia cho 0 hoặc input không phải là số', () => {
    expect(() => calc.divide(10, 0)).toThrowError('Cannot divide by zero');
    expect(() => calc.add('1', 2)).toThrowError('Inputs must be numbers');
  });

  describe('Tính Factorial', () => {
    it('nên tính giai thừa đúng cho số dương và số 0', () => {
      expect(calc.factorial(5)).toBe(120);
      expect(calc.factorial(0)).toBe(1);
    });

    it('nên báo lỗi khi giai thừa số âm', () => {
      expect(() => calc.factorial(-1)).toThrowError('Factorial for negative numbers is not defined');
    });
  });

  describe('Dãy Fibonacci', () => {
    it('nên trả về dãy đúng khi n > 0', () => {
      expect(calc.fibonacci(5)).toEqual([0, 1, 1, 2, 3]);
      expect(calc.fibonacci(1)).toEqual([0]);
    });

    it('nên trả về mảng rỗng nếu fibonacci n <= 0', () => {
      expect(calc.fibonacci(0)).toEqual([]);
      expect(calc.fibonacci(-5)).toEqual([]);
    });
  });

  it('nên kiểm tra số chẵn lẻ chính xác', () => {
    expect(calc.isEven(100)).toBeTrue();
    expect(calc.isEven(101)).toBeFalse();
  });
  it('kết quả fibonacci phải luôn trả về một mảng', () => {
    expect(calc.fibonacci(3)).toEqual(jasmine.any(Array));
  });
});