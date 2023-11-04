import Stack from "./stack.js";

const operatorsSymbols = ["+", "-", "*", "/", "(", ")"];

const isOperator = (token) => operatorsSymbols.includes(token);
const isNumber = (token) => token.match(/^\d+$/gm);
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
 * @param {string} tokensString
 */
export default function shuntingYard(tokensString) {
  let output = [];
  let stack = new Stack();

  let tokens = tokensString.replaceAll(" ", "").split("");
  console.log("initial tokens", tokens);

  tokens.forEach((token) => {
    if (isNumber(token)) {
      output.push(token);
    } else if (isOperator(token)) {
      let top_operator = stack.peek();
      console.log(top_operator);

      if (isRightParenthesis(token)) {
        while (isNotNull(top_operator) && !isLeftParenthesis(top_operator)) {
          output.push(top_operator);
          stack.pop();
          top_operator = stack.peek();
        }
        stack.pop();
      } else if (isLeftParenthesis(token)) {
        stack.push(token);
      } else {
        while (
          isNotNull(top_operator) &&
          operators[top_operator]?.precedence > operators[token]?.precedence
        ) {
          output.push(top_operator);
          stack.pop();
          top_operator = stack.peek();
        }

        console.log(stack.peek());
        stack.push(token);
      }
    }
  });

  while (!stack.isEmpty()) {
    output.push(stack.pop());
  }

  return output.join("");
}
