import ShuntingYardAlgorithm from "./scripts/shuntingYardAlgorithm.js";
import { isArithmeticOperator, isParentheses } from "./scripts/utils.js";
import ReversePolishNotation from "./scripts/reversePolishNotation.js";
import { interfaceUISteps } from "./scripts/display.js";

const rootEl = document.querySelector(":root");
const operationsButtons = document.querySelectorAll("[data-operation]");
const numbersButtons = document.querySelectorAll("[data-number]");
const actionsButtons = document.querySelectorAll("[data-action]");
const accurateResult = document.getElementById("accurate-result");
const previousOperationText = document.querySelector(
  "[data-result='previous']"
);
const currentOperationText = document.querySelector("[data-result='now']");

const currentOperation = {
  get: () => currentOperationText.textContent,
  set: (string) => (currentOperationText.textContent = string),
};

const numberText = document.querySelector("div.number");

const getLastPressedButton = () =>
  currentOperation.get()[currentOperation.get().length - 1];
let openedParentheses = 0;
let closedParentheses = 0;
let currentState = "";

function changeDisplaySize(value) {
  rootEl.style.setProperty("--display-scale", value);
}

function clearDisplay() {
  currentOperation.set("");
  interfaceUISteps.clearSteps();

  openedParentheses = 0;
  closedParentheses = 0;
  currentState = "";
}

function updateDisplay(value) {
  currentOperation.set(currentOperation.get() + `${value}`);

  let displayLength = currentOperation.get().length;
  if (displayLength > 40) {
    changeDisplaySize(0.64);
  } else if (displayLength > 20) {
    changeDisplaySize(0.8);
  } else {
    changeDisplaySize(1);
  }
}

const actionOperations = {
  equals: getResult,
  clear: clearDisplay,
  erase: function () {
    let operation = currentOperation.get();
    if (getLastPressedButton() == "(") {
      openedParentheses--;
    } else if (getLastPressedButton() == ")") {
      closedParentheses--;
    }

    if (operation.length != 0) {
      currentOperationText.textContent = operation.slice(0, -1);
    }
  },
};

actionsButtons.forEach((button) =>
  button.addEventListener("click", () =>
    actionOperations[button.dataset.action]()
  )
);

const operations = {
  plus: () => "+",
  minus: () => "-",
  times: () => "x",
  divide: () => "/",
  openParentheses: () => {
    openedParentheses++;
    if (
      !isParentheses(getLastPressedButton()) &&
      !isArithmeticOperator(getLastPressedButton()) &&
      currentState != ""
    )
      return "x(";
    return "(";
  },
  closeParentheses: () => {
    closedParentheses++;
    return ")";
  },
};

operationsButtons.forEach((button) =>
  button.addEventListener("click", () => {
    let operator = operations[button.dataset.operation]();

    updateDisplay(operator);
    currentState = operator;

    currentState = "";
  })
);

numbersButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let isNotCloseParentesesAfter = getLastPressedButton() != ")";

    let buttonNumber = button.textContent;

    // não permitir inicialmente dois 0 consecutivos (00)
    let isTwoConsecutiveZeros = currentState == "0" && buttonNumber == "0";

    // não permitir vírgulas iniciais
    let isCommaInitialValue = currentState == "" && buttonNumber == ",";

    // verificar se já existe o ponto no numero atual definido
    let isTwoConsecutivePoints =
      currentState.includes(".") && buttonNumber == ",";

    if (
      !isTwoConsecutivePoints &&
      !isTwoConsecutiveZeros &&
      !isCommaInitialValue &&
      isNotCloseParentesesAfter
    ) {
      updateDisplay(buttonNumber);

      // substituir virgula por ponto no cálculo
      if (buttonNumber == ",") buttonNumber = ".";
      currentState += `${buttonNumber}`;
    }
  });
});

/**
 * Verificar se a operação definida na calculadora é valida e se há equilíbrio entre parênteses (fechas e abertas)
 * @param {string} operation
 * @returns {boolean}
 */
function isCurrentOperationValid(operation) {
  if (!(openedParentheses == closedParentheses)) return false;
  if (!operation.match(/^[0-9()+\-*.\/]*$/gm)) return false;
  return true;
}

const SEPARATOR_REGEX = /(\d+(?:\.\d+)?|[+\-*()/])/g;
/**
 * Separar as expressões com RegEx : (1.2+1-6) retorna ['1.2', '+', '1', '-', '6']
 * @param {string} expression
 * @returns {Array<string>}
 */
const separateOperationsAndOperators = (expression) => {
  return expression.match(SEPARATOR_REGEX) || [];
};
//console.log(separateOperationsAndOperators("(1.2+1-6)"));

/**
 * Limpar a string de operação: ',' vira '.' e 'x' vira '*', além de tirar os whitespaces
 * @param {string} operation
 */
const sanitizeOperation = (operation) => {
  return operation.replace("x", "*").replace(",", ".").replace(" ", "").trim();
};

function getResult() {
  let operation = currentOperation.get() || "5+((1+2)x4)-3"; //estático
  // let operation = currentOperation.get() || "3+4x(2-1)/5"; //estático

  if (operation == previousOperationText.textContent) {
    return "";
  }

  previousOperationText.textContent = operation;

  try {
    operation = sanitizeOperation(operation);
    interfaceUISteps.clearSteps();
    if (isCurrentOperationValid(operation)) {
      const separatedOperations = separateOperationsAndOperators(operation);
      console.log(separatedOperations);
      let tokens = ShuntingYardAlgorithm.tokenize(separatedOperations);
      let result = ReversePolishNotation.calculate(tokens).pop();

      accurateResult.innerHTML = eval(operation);
      currentOperation.set(result);
    } else {
      window.alert("Equação aritmética não é válida!");
      throw new Error("Equação inválida");
    }
  } catch (e) {
    console.error(e);
    window.alert("Equação aritmética não é válida!");
    numberText.classList.add("error");
  } finally {
    setTimeout(() => {
      numberText.classList.remove("error");
    }, 2000);
  }
}

// console.log("2 + 2 + 2 ->", shuntingYard("2 + 2 + 2")); // 2 2 + 2 +
// console.log("3 + 4 * ( 2 - 1 ) / 5 ->", shuntingYard("3 + 4 * ( 2 - 1 ) / 5")); // 2 2 + 2 +
// console.log("2 + 2 * 2 ->", shuntingYard("2 + 2 * 2")); // 2 2 2 * +
// console.log("(2 + 2) * 2 ->", shuntingYard("(2 + 2) * 2")); // 2 2 + 2 *
// console.log("2 / (4 * 2) ->", shuntingYard("2 / (4 * 2)")); // 2 4 2 * /
