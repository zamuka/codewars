
function isDigit(char) {
  return '0123456789.'.includes(char);
}

function isOperatorChar(char) {
  return '*/+-'.includes(char);
}

function getTokens(text) {
  const tokens = [];
  let number = '';

  for (let pos = 0; pos < text.length; pos = pos + 1) {
    const char = text[pos];
    if (isOperatorChar(char)) {
      tokens.push({ operator: char });
      continue;
    }

    if (isDigit(char)) {
      number = number + char;
      // end of number (either operator or end of the input text)
      if (!isDigit(text[pos + 1])) {
        tokens.push({ type: 'number', value: Number(number) });
        number = '';
      }
    }
  }

  return tokens;
}

/**
 * @param {string} rawExpression
 */
function calc(rawExpression) {
  let expression = rawExpression.replace(/ /g, '');

  let openParPos = expression.lastIndexOf('(');
  while (openParPos > -1) {
    const closeParPos = expression.indexOf(')', openParPos);
    expression = expression.slice(0, openParPos) +
      calc(expression.slice(openParPos + 1, closeParPos)) +
      expression.slice(closeParPos + 1);

    openParPos = expression.lastIndexOf('(');
  }

  // no parentheses at this point
  const tokens = getTokens(expression);

  function binaryOperation(index, operation) {
    const left = Number(tokens[index - 1].value);
    const right = Number(tokens[index + 1].value);
    const resultToken = {
      type: 'number',
      value: operation(left, right),
    }
    tokens.splice(index - 1, 3, resultToken);
  }

  function unaryOperation(index, operation) {
    const right = Number(tokens[index + 1].value);
    const resultToken = {
      type: 'number',
      value: operation(right),
    }
    tokens.splice(index, 2, resultToken);
  }

  let index = tokens.length - 2;

  while (index > -1) {
    if (tokens[index].operator === '-' && (tokens[index - 1] || {}).type !== 'number') {
      unaryOperation(index, a => -a);
    }
    index = index - 1;
  }

  // handle multiplications
  index = 0;
  while (index < tokens.length - 1) {
    if (tokens[index].operator === '*') {
      binaryOperation(index, (a, b) => a * b);
      continue;
    }
    if (tokens[index].operator === '/') {
      binaryOperation(index, (a, b) => a / b);
      continue;
    }
    index = index + 1;
  }

  index = 0;
  while (index < tokens.length - 1) {
    if (tokens[index].operator === '-') {
      binaryOperation(index, (a, b) => a - b);
      continue;
    }
    if (tokens[index].operator === '+') {
      binaryOperation(index, (a, b) => a + b);
      continue;
    }
    index = index + 1;
  }

  return tokens[0].value;
};

module.exports = {
  calc,
  getTokens,
}