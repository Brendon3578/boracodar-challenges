import Stack from "./stack.js";
import shuntingYard from "./shuntingYardAlgorithm.js";

const rootEl = document.querySelector(":root");
const operationsButtons = document.querySelectorAll("[data-operation]");
const numbersButtons = document.querySelectorAll("[data-number]");
const previousOperationText = document.querySelector(
  "[data-result='previous']"
);
const currentOperationText = document.querySelector("[data-result='now']");

let isOperationalPressed = false;
const RPNStack = new Stack();

const operators = ["+", "-", "*", "/"];
const isOperator = (value) => operators.includes(value);
const isParentheses = (value) => ["(", ")"].includes(value);
const getLastPressedButton = () =>
  currentOperationText.textContent[currentOperationText.textContent.length - 1];
let openedParentheses = 0;
let closedParentheses = 0;
let currentState = "";

function calculate(n1, operator, n2) {
  let result = "";

  if (operator === "+") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "-") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "*") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "/") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
}
function applyOperator(character) {
  // todo: tratar porcentagem

  if (isOperator(character)) {
    let lastNumber = RPNStack.pop();
    let penultimateNumber = RPNStack.pop();
    let result = calculate(lastNumber, character, penultimateNumber);
    RPNStack.push(result);
  } else {
    RPNStack.push(character);
  }
}

function changeDisplaySize(value) {
  rootEl.style.setProperty("--display-scale", value);
}

function clearDisplay() {
  currentOperationText.textContent = "";
  openedParentheses = 0;
  closedParentheses = 0;
  currentState = "";
  return "";
}

function updateDisplay(value) {
  currentOperationText.textContent += `${value}`;

  let displayLength = currentOperationText.textContent.length;
  if (displayLength > 40) {
    changeDisplaySize(0.64);
  } else if (displayLength > 20) {
    changeDisplaySize(0.8);
  } else {
    changeDisplaySize(1);
  }
}

const operations = {
  plus: () => "+",
  minus: () => "-",
  times: () => "x",
  divide: () => "/",
  equals: () => getResult(),
  clear: () => clearDisplay(),
  openParentheses: () => {
    openedParentheses++;
    console.log(getLastPressedButton());
    if (
      !isParentheses(getLastPressedButton()) &&
      !isOperator(getLastPressedButton()) &&
      currentState != ""
    )
      return "x(";
    return "(";
  },
  closeParentheses: () => {
    closedParentheses++;
    return ")";
  },
  erase: () => {
    let operation = currentOperationText.textContent;
    if (getLastPressedButton() == "(") {
      openedParentheses--;
    } else if (getLastPressedButton() == ")") {
      closedParentheses--;
    }

    if (operation.length != 0) {
      currentOperationText.textContent = operation.slice(0, -1);
    }
    return "";
  },
};

operationsButtons.forEach((button) =>
  button.addEventListener("click", () => {
    let operator = operations[button.dataset.operation]();

    updateDisplay(operator);
    currentState = operator;
    isOperationalPressed = true;

    currentState = "";
  })
);

numbersButtons.forEach((button) => {
  button.addEventListener("click", () => {
    isOperationalPressed = false;

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

function isCurrentOperationValid(operation) {
  console.log(operation);
  if (!(openedParentheses == closedParentheses)) return false;
  if (!operation.match(/^[0-9()+\-*.\/]*$/gm)) return false;

  return true;
}

const separatorRegex = /(\d+(?:\.\d+)?|[+\-*/])/g;
const separateOperationsAndOperators = (expression) =>
  expression.match(separatorRegex) || [];

const numberText = document.querySelector("div.number");

function getResult() {
  let operation = currentOperationText.textContent;
  previousOperationText.textContent = operation;

  try {
    operation = operation
      .replace("x", "*")
      .replace(",", ".")
      .replace(" ", "")
      .trim();
    if (isCurrentOperationValid(operation)) {
      const separatedOperations = separateOperationsAndOperators(operation);
      console.log(separatedOperations);
      console.log(shuntingYard(separatedOperations));
      currentOperationText.textContent = eval(operation);
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

  return "";
}

// console.log("2 + 2 + 2 ->", shuntingYard("2 + 2 + 2")); // 2 2 + 2 +
// console.log("3 + 4 * ( 2 - 1 ) / 5 ->", shuntingYard("3 + 4 * ( 2 - 1 ) / 5")); // 2 2 + 2 +
// console.log("2 + 2 * 2 ->", shuntingYard("2 + 2 * 2")); // 2 2 2 * +
// console.log("(2 + 2) * 2 ->", shuntingYard("(2 + 2) * 2")); // 2 2 + 2 *
// console.log("2 / (4 * 2) ->", shuntingYard("2 / (4 * 2)")); // 2 4 2 * /
