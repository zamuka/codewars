import { lengthOfLIS } from "./subsequence";

describe('subs', () => {
  it('should be fine', () => {
    expect(lengthOfLIS([10,9,2,5,3,7,101,18])).toBe(4);
  });
});