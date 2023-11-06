/**
 * Um objeto que define a precedência, a associatividade e o cálculo dos operadores aritméticos.
 */
const OPERATORS = {
  "+": { precedence: 2, associativity: "left", calculate: (a, b) => a + b },
  "-": { precedence: 2, associativity: "left", calculate: (a, b) => a - b },
  "*": { precedence: 3, associativity: "left", calculate: (a, b) => a * b },
  "/": { precedence: 3, associativity: "left", calculate: (a, b) => a / b },
};

/**
 * Símbolos de operadores matemáticos, incluindo parênteses.
 */
const OPERATOR_SYMBOLS = ["+", "-", "*", "/", "(", ")"];

/**
 * Símbolos de operadores matemáticos exclusivamente aritméticos.
 */
const ONLY_ARITHMETIC_OPERATORS = ["+", "-", "*", "/"];

/**
 * Símbolos de parênteses.
 */
const PARENTHESES_SYMBOLS = ["(", ")"];

/**
 * Operadores unários permitidos.
 */
const UNARY_OPERATORS = ["+", "-"];

/**
 * Verifica se o valor dado é um operador aritmético.
 * @param {string} value - O valor a ser verificado.
 * @returns {boolean} `true` se o valor for um operador aritmético, caso contrário, `false`.
 */
const isArithmeticOperator = (value) =>
  ONLY_ARITHMETIC_OPERATORS.includes(value);

/**
 * Verifica se o valor dado é um parêntese.
 * @param {string} value - O valor a ser verificado.
 * @returns {boolean} `true` se o valor for um parêntese, caso contrário, `false`.
 */
const isParentheses = (value) => PARENTHESES_SYMBOLS.includes(value);

/**
 * Verifica se o token dado é um operador.
 * @param {string} token - O token a ser verificado.
 * @returns {boolean} `true` se o token for um operador, caso contrário, `false`.
 */
const isOperator = (token) => OPERATOR_SYMBOLS.includes(token);

/**
 * Verifica se o token dado é um número.
 * @param {string} token - O token a ser verificado.
 * @returns {boolean} `true` se o token for um número, caso contrário, `false`.
 */
const isNumber = (token) => !isNaN(token);

/**
 * Verifica se o token dado é um parêntese aberto.
 * @param {string} token - O token a ser verificado.
 * @returns {boolean} `true` se o token for um parêntese aberto, caso contrário, `false`.
 */
const isLeftParenthesis = (token) => token == "(";

/**
 * Verifica se o token dado é um parêntese fechado.
 * @param {string} token - O token a ser verificado.
 * @returns {boolean} `true` se o token for um parêntese fechado, caso contrário, `false`.
 */
const isRightParenthesis = (token) => token == ")";

/**
 * Verifica se o token dado não é nulo.
 * @param {string} token - O token a ser verificado.
 * @returns {boolean} `true` se o token não for nulo, caso contrário, `false`.
 */
const isNotNull = (token) => token != null;

const isMinusToken = (token) => token == "-";

/**
 * @param {Queue | Stack} struct
 * @param {string} message
 * @param {string} color
 */
function logStructState(struct, message, color) {
  console.log(
    `${message}\n` + `%c[%c${struct.toString()}%c]`,
    `color: ${color}`,
    "color: white",
    `color: ${color}`
  );
}

/**
 * Verifica se o token dado é um operador unário.
 * @param {string} token - O token a ser verificado.
 * @returns {boolean} `true` se o token for um operador unário, caso contrário, `false`.
 */
const isUnaryOperator = (token) => UNARY_OPERATORS.includes(token);

export {
  isArithmeticOperator,
  isParentheses,
  isOperator,
  isNumber,
  isLeftParenthesis,
  isRightParenthesis,
  isNotNull,
  OPERATORS,
  logStructState,
  isUnaryOperator,
  isMinusToken,
};
