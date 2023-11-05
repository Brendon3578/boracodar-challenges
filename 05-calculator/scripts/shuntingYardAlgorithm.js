import Stack from "./stack.js";
import Queue from "./queue.js";

import {
  isLeftParenthesis,
  isNotNull,
  isNumber,
  isOperator,
  isRightParenthesis,
  OPERATORS,
  logStructState,
} from "./utils.js";

/**
 * @param {Array<string>} tokensString
 */

export default class ShuntingYardAlgorithm {
  /**
   * @param {Array<String>} input
   */
  static tokenize(input) {
    const outputQueue = new Queue();
    const operatorStack = new Stack();

    input.forEach((token) => {
      if (isNumber(token)) {
        outputQueue.enqueue(token);
      } else if (isOperator(token)) {
        let top_operator = operatorStack.peek();

        if (isRightParenthesis(token)) {
          while (isNotNull(top_operator) && !isLeftParenthesis(top_operator)) {
            outputQueue.enqueue(top_operator);
            operatorStack.pop();
            top_operator = operatorStack.peek();
          }
          if (isLeftParenthesis(top_operator)) {
            operatorStack.pop(); // Remove o parêntese esquerdo da pilha
          }
        } else if (isLeftParenthesis(token)) {
          operatorStack.push(token);
        } else {
          while (
            operatorStack.size() > 0 &&
            isOperator(operatorStack.peek()) &&
            OPERATORS[token]?.precedence <=
              OPERATORS[operatorStack.peek()]?.precedence
          ) {
            outputQueue.enqueue(operatorStack.pop());
          }
          operatorStack.push(token);
        }
      }

      logStructState(
        operatorStack,
        "Pilha de Operadores para cada iteração: ",
        "Chartreuse"
      );
    });

    while (!operatorStack.isEmpty()) {
      outputQueue.enqueue(operatorStack.pop());
    }

    logStructState(outputQueue, "Saída da Fila no Final: ", "DeepSkyBlue");

    return outputQueue;
  }
}
