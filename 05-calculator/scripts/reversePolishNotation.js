import Queue from "./queue.js";
import Stack from "./stack.js";
import {
  OPERATORS,
  isArithmeticOperator,
  isNumber,
  logStructState,
} from "./utils.js";

export default class ReversePolishNotation {
  /**
   * Calcular a notação pós-fixada (Notação Polonesa Inversa - RPN)
   * @param {Queue} queue
   * @returns {Stack}
   * @see {@link https://pt.wikipedia.org/wiki/Nota%C3%A7%C3%A3o_polonesa_inversa} para mais informações
   */
  static calculate(queue) {
    let stack = new Stack();

    while (!queue.isEmpty()) {
      let token = queue.dequeue();

      if (isNumber(token)) {
        stack.push(token);
      } else if (isArithmeticOperator(token)) {
        // último vai em segundo
        let right = stack.pop();
        // penúltimo vai em primeiro
        let left = stack.pop();
        // exemplo:
        // 4 2 / -> fica 4 / 2 = 2 e não 2 / 4 = 0.5

        let result = OPERATORS[token].calculate(
          parseFloat(left),
          parseFloat(right)
        );
        stack.push(result);
      }
      logStructState(stack, "Estado atual da Pilha: ", "DarkSlateBlue");
    }

    logStructState(stack, "Resultado da Pilha no final: ", "blueviolet");

    return stack;
  }
}
