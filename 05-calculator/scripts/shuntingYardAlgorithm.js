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
import { interfaceUISteps } from "./display.js";

/**
 * @param {Array<string>} tokensString
 */

export default class ShuntingYardAlgorithm {
  /**
   * @param {Array<String>} input
   */
  static tokenize(input) {
    interfaceUISteps.addStep("input", input, "init");

    const outputQueue = new Queue();
    const operatorStack = new Stack();

    input.forEach((token) => {
      if (isNumber(token)) {
        outputQueue.enqueue(token);
        interfaceUISteps.addStep("output", token, "enqueue");
      } else if (isOperator(token)) {
        let top_operator = operatorStack.peek();

        if (isRightParenthesis(token)) {
          while (isNotNull(top_operator) && !isLeftParenthesis(top_operator)) {
            outputQueue.enqueue(top_operator);
            operatorStack.pop();

            interfaceUISteps.addStep("stack", null, "pop");
            interfaceUISteps.addStep("output", top_operator, "enqueue");

            top_operator = operatorStack.peek();
          }
          if (isLeftParenthesis(top_operator)) {
            interfaceUISteps.addStep("stack", null, "pop");
            operatorStack.pop(); // Remove o parêntese esquerdo da pilha
          }
        } else if (isLeftParenthesis(token)) {
          interfaceUISteps.addStep("stack", token, "push");
          operatorStack.push(token);
        } else {
          while (
            operatorStack.size() > 0 &&
            isOperator(operatorStack.peek()) &&
            OPERATORS[token]?.precedence <=
              OPERATORS[operatorStack.peek()]?.precedence
          ) {
            interfaceUISteps.addStep(
              "output",
              operatorStack.peek(),
              "enqueueFromStack"
            );

            outputQueue.enqueue(operatorStack.pop());
          }

          interfaceUISteps.addStep("stack", token, "push");
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
      interfaceUISteps.addStep(
        "output",
        operatorStack.peek(),
        "enqueueFromStack"
      );
      outputQueue.enqueue(operatorStack.pop());
    }

    logStructState(outputQueue, "Saída da Fila no Final: ", "DeepSkyBlue");

    interfaceUISteps.showSteps();

    return outputQueue;
  }
}
