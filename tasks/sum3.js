const SEP = '|';
/**
 * @param {number[]} input
 * @return {number[][]}
 */

let x = 0;
export var threeSum = function(input) {
  const possible = new Set(input);
	const results = new Set();
	const seen = {};
	const pairLookup = {};

	function addResults(num) {
		pairLookup[num].forEach(pair => results.add(
            [...pair.split(SEP), num].sort((a, b) => a - b).join(SEP))
        );
    }

    function check(a, b) {
        x = x + 1;
        const wanted = -(a + b);
        const wantedPair = (a < b ? [a, b] : [b, a]).join(SEP);
        if (!possible.has(wanted)) {
          return;
        }
        if (pairLookup[wanted]) {
            (pairLookup[wanted].add(wantedPair));
            return;
        }
        pairLookup[wanted] = new Set([wantedPair]);
    }

    for (let num of input) {
        if (pairLookup[num]) {
            addResults(num);
        }

        if (seen[num] > 1) {
            continue;
        }


        if (seen[num] === 1) {
            check(num, num);
            seen[num] = 2;
            continue;
        }

        Object.keys(seen).forEach(seenNum => check(Number(seenNum), num));
        seen[num] = 1;
    }

    console.log(x);
    return Array.from(results).map(str => str.split(SEP));


}