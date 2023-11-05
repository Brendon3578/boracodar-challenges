import Queue from "./queue.js";

const inputEl = document.getElementById("shunting-input");
const outputEl = document.getElementById("shunting-output");
const stackEl = document.getElementById("shunting-stack");
const directionArrow = document.getElementById("direction-arrow");

/**
 * @param {string} token
 * @param {HTMLElement} el
 */
function addToken(token, el) {
  const tokenEl = `<span class="op" title="${token}">${token}</span>`;
  el.innerHTML += tokenEl;
}

const changeSymbol = {
  toOutput() {
    directionArrow.innerText = "←";
  },
  toStack() {
    directionArrow.innerText = "↓";
  },
  fromStack() {
    directionArrow.innerText = "↰";
  },
};

const interfaceUI = {
  setInitialInputTokens(tokens) {
    tokens.forEach((token) => {
      addToken(token, inputEl);
    });
  },
  pushStack(token) {
    addToken(token, stackEl);
  },
  removeInputToken() {
    inputEl.removeChild(inputEl.children[0]);
  },
  popStack() {
    stackEl.removeChild(stackEl.children[0]);
  },
  addOutput(token) {
    addToken(token, outputEl);
  },
};

class interfaceUISteps {
  static #queueOperationsStep = new Queue();
  static awaitTime = 1;
  /**
   *
   * @param {"input" | "output" | "stack"} struct
   * @param {string | null} token
   * @param {"push" | "pop" | "enqueueFromStack" | "enqueue" | "init"} operation
   */
  static addStep(struct, token, operation) {
    this.#queueOperationsStep.enqueue({
      struct: struct,
      token: token,
      operation: operation,
    });
  }

  static async showSteps() {
    while (!this.#queueOperationsStep.isEmpty()) {
      this.awaitTime += 1;

      let { struct, token, operation } = this.#queueOperationsStep.dequeue();

      await setTimeout(() => {
        switch (struct) {
          case "input":
            interfaceUI.setInitialInputTokens(token);
            break;
          case "output":
            if (operation == "enqueue") {
              interfaceUI.removeInputToken();
              interfaceUI.addOutput(token);
            }
            if (operation == "enqueueFromStack") {
              interfaceUI.addOutput(token);
              interfaceUI.popStack();
            }
            break;
          case "stack":
            if (operation == "push") {
              interfaceUI.removeInputToken();
              interfaceUI.pushStack(token);
            } else if (operation == "pop") {
              interfaceUI.popStack();
            }
            break;
        }
      }, 1000 * this.awaitTime);
    }
  }
}

export { interfaceUISteps };
