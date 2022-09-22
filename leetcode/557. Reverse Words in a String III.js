/**
 * @param {string} s
 * @return {string}
 */
function reverseWords(s) {
  let result = '';
  let currentWord = '';

  for (let letter of s) {
      if (letter === ' ') {
          result = result + currentWord + ' ';
          currentWord = '';
          continue;
      }
      currentWord = letter + currentWord;
  }

  result = result + currentWord;

  return result;
};