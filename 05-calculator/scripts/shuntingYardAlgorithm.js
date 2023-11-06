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
  isArithmeticOperator,
  isParentheses,
  isUnaryOperator,
  isMinusToken,
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

    // verificar se o primeiro operador é unário -> -3+3
    let index = 0;
    const isSecondToken = (index) => index == 2;

    let isUnaryOperatorInStack = false;

    input.forEach((token) => {
      index++;

      if (isNumber(token)) {
        //verificar casos de operações unárias dentro da stack
        if (isUnaryOperatorInStack && isMinusToken(operatorStack.peek())) {
          let operatorToConcat = operatorStack.pop();
          // na operação 3*-3 o 3 será armazenado com o operador dentro da stack (-3)
          token = `${operatorToConcat}${token}`;

          interfaceUISteps.addStep("stack", null, "pop");
          isUnaryOperatorInStack = false;
        }

        //verificar casos de operações unárias
        if (
          isSecondToken(index) &&
          isArithmeticOperator(operatorStack.peek()) &&
          isMinusToken(operatorStack.peek())
        ) {
          let operatorToConcat = operatorStack.pop();
          // na operação -3+3 o 3 fica armazenado -3 como tokens juntos
          token = `${operatorToConcat}${token}`;

          interfaceUISteps.addStep("stack", null, "pop");
        }

        outputQueue.enqueue(token);
        interfaceUISteps.addStep("output", token, "enqueue");
      } else if (isOperator(token)) {
        let top_operator = operatorStack.peek();

        // verificar casos de operações unárias
        // não verificar se for parenteses
        let hasAlreadyArithmeticOperatorInStack =
          isArithmeticOperator(top_operator) && !isParentheses(token);

        if (hasAlreadyArithmeticOperatorInStack) {
          if (isUnaryOperator(token)) {
            isUnaryOperatorInStack = true;
          } else {
            // não permitir os seguintes cenários: 3*/3 ou 3/*3 e sim apenas 3+-3
            throw new Error("Expressão aritmética inválida");
          }
        }

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
            !(isUnaryOperatorInStack && isMinusToken(token)) && // resolver isso:
            // essa operação funciona com 3x-3 mas não com  5+((1+2)x4)-3
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
        "Chartreuse" //nome de cor
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

    interfaceUISteps.addStep("input", null, "finish");

    interfaceUISteps.showSteps();

    return outputQueue;
  }
}
