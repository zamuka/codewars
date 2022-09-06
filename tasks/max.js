/**
 * Given an array of integers.
 * Find a max number in the given range
 */
class MaxFinder {
  /**
   * @param {number[]} numbers
   */
  constructor(numbers) {
    this.numbers = numbers;
    this.cache = {};
  }

  getFromCache(rangeStart, rangeEnd) {
    if (this.cache[rangeStart] && String(rangeEnd) in this.cache[rangeStart]) {
      return this.cache[rangeStart][rangeEnd];
    }
    return null;
  }

  saveToCache(rangeStart, rangeEnd, result) {
    this.cache[rangeStart] = this.cache[rangeStart] || {};
    this.cache[rangeStart][rangeEnd] = result;

  }
  /**
   * @param {number} start
   * @param {number} end
   */
  getMax(start, end, rangeStart = 0, rangeEnd = this.numbers.length) {

    const fullyInRange = rangeStart >= start && rangeEnd <= end;

    if (fullyInRange) {
      const cached = this.getFromCache(rangeStart, rangeEnd);

      if (cached !== null) {
        return cached;
      }
    }

    if (start >= rangeEnd || end < rangeStart) {
      return null;
    }

    if (rangeEnd - rangeStart === 1) {
      return this.numbers[rangeStart];
    }

    const mid = (rangeStart + rangeEnd) >> 1;
    const leftMax = this.getMax(start, end, rangeStart, mid);
    const rightMax = this.getMax(start, end, mid, rangeEnd);

    if (leftMax === null) return rightMax;
    if (rightMax === null) return leftMax;

    const result = rightMax > leftMax ? rightMax : leftMax;

    if (fullyInRange) {
      this.saveToCache(rangeStart, rangeEnd, result);
    }

    return result;

  }
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

const numbers = [];


for (let i = 0; i < 1_000_000; i++) {
  numbers.push(getRandom(1_000));
}

numbers[777_777] = 2000;
numbers[888_777] = 2100;


const maxFinder = new MaxFinder(numbers);

console.time('first')
console.log(maxFinder.getMax(0, 700_000));
console.timeEnd('first');

console.time('second')
console.log(maxFinder.getMax(800_000, 900_000));
console.timeEnd('second');

console.time('third')
console.log(maxFinder.getMax(0, 999_999));
console.timeEnd('third');