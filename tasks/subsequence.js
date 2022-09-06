function last(arr) {
    return arr[arr.length - 1];
}
/**
 * @param {number[]} nums
 * @return {number}
 */
export const lengthOfLIS = function (nums) {
    // index - sequence length
    // item value - highest number in the sequence
    const highestLongest = [];
    for (let num of nums) {

        if (!highestLongest.length || num > last(highestLongest)) {
            highestLongest.push(num);
            continue;
        }


        let start = 0;
        let end = highestLongest.length - 1;

        while (start <= end) {

            let mid = Math.floor((start + end) / 2);

            if (highestLongest[mid] === num) {
                break;
            }

            if (num > highestLongest[mid]) {
                start = mid + 1;
                continue;
            }

            if (num > highestLongest[mid - 1] || mid === 0) {
                highestLongest[mid] = num;
                break;
            }

            end = mid - 1;
        }


        // if (num > last(highestLongest)) {
        //     highestLongest.push(num);
        //     continue;
        // }

        // find sequence index of longest that is larger
        // do binary search

        // for (let i = highestLongest.length - 1; i >= 0; i = i - 1) {
        //     if (highestLongest[i] > num && (highestLongest[i - 1] < num || i === 0)) {
        //         highestLongest[i] = num;
        //         break;
        //     }
        // }


    }
    return highestLongest.length;
};