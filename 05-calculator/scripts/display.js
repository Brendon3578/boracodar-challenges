const shuntingInputEl = document.getElementById("shunting-input");
const shuntingOutputEl = document.getElementById("shunting-output");
const shuntingStackEl = document.getElementById("shunting-stack");

/**
 *
 * @param {string} token
 * @param {HTMLElement} el
 */
function addToken(token, el) {
  const tokenEl = `<span class="op" title="${token}">${token}</span>`;

  el.innerHTML += tokenEl;
}

["A", "B", "C", "D"].forEach((e) => {
  addToken(e, shuntingOutputEl);
});

["C", "-", "D"].forEach((e) => {
  addToken(e, shuntingInputEl);
});

["X", "+"].forEach((e) => {
  addToken(e, shuntingStackEl);
});
