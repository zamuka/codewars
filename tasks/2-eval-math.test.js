const { calc, getTokens } = require('./2-eval-math.js');

describe("Tests", () => {
  const tests = [
    // ['1+1', 2],
    // ['1 - 1', 0],
    // ['1* 1', 1],
    // ['1 /1', 1],
    // ['-123', -123],
    // ['123', 123],
    // ['2 /2+3 * 4.75- -6', 21.25],
    // ['12* 123', 1476],
    // ['2 / (2 + 3) * 4.33 - -6', 7.732],
    ['12* 123/-(-5 + 2)', 492],
  ];

  for (const [input, expected] of tests) {
    it(String(input), () => {
      expect(calc(String(input))).toEqual(expected)
    })
  }
});
