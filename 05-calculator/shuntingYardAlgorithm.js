import Stack from "./stack.js";

const operatorsSymbols = ["+", "-", "*", "/", "(", ")"];

const isOperator = (token) => operatorsSymbols.includes(token);
const isNumber = (token) => !isNaN(token);
const isLeftParenthesis = (token) => token == "(";
const isRightParenthesis = (token) => token == ")";
const isNotNull = (token) => token != null;

let operators = {
  "+": { precedence: 2, associativity: "left", calculate: (a, b) => a + b },
  "-": { precedence: 2, associativity: "left", calculate: (a, b) => a - b },
  "*": { precedence: 3, associativity: "left", calculate: (a, b) => a * b },
  "/": { precedence: 3, associativity: "left", calculate: (a, b) => a / b },
};

/**
 * @param {Array<string>} tokensString
 */
export default function shuntingYard(tokens) {
  let output = [];
  let stack = new Stack();

  tokens.forEach((token) => {
    if (isNumber(token)) {
      output.push(token);
      // todo: save 3.33 + 3
    } else if (isOperator(token)) {
      let top_operator = stack.peek();

      if (isRightParenthesis(token)) {
        while (isNotNull(top_operator) && !isLeftParenthesis(top_operator)) {
          output.push(top_operator);
          stack.pop();
          top_operator = stack.peek();
        }
        if (isLeftParenthesis(top_operator)) {
          stack.pop(); // Remove o parêntese esquerdo da pilha
        }
      } else if (isLeftParenthesis(token)) {
        stack.push(token);
      } else {
        while (
          stack.size() > 0 &&
          isOperator(stack.peek()) &&
          operators[token]?.precedence <= operators[stack.peek()]?.precedence
        ) {
          output.push(stack.pop());
        }
        stack.push(token);
      }
    }
  });

  while (!stack.isEmpty()) {
    output.push(stack.pop());
  }

  return output.join("");
}
