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

export function clearSteps() {}

const changeSymbol = {
  toOutput() {
    directionArrow.innerHTML = '<i class="ph ph-arrow-left"></i>';
  },
  toStack() {
    directionArrow.innerHTML = '<i class="ph ph-arrow-elbow-left-down"></i>';
  },
  toOutputFromStack() {
    directionArrow.innerHTML = '<i class="ph ph-arrow-elbow-up-left"></i>';
  },
  toWaiting() {
    directionArrow.innerHTML = '<i class="ph-fill ph-hourglass-high"></i>';
  },
  toFinished() {
    directionArrow.innerHTML = '<i class="ph ph-check"></i>';
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
  finishedOutput() {
    changeSymbol.toFinished();
  },
};

class interfaceUISteps {
  static #queueOperationsStep = new Queue();
  static awaitTime = 1;
  /**
   *
   * @param {"input" | "output" | "stack"} struct
   * @param {string | null} token
   * @param {"push" | "pop" | "enqueueFromStack" | "enqueue" | "init" | "finish"} operation
   */
  static addStep(struct, token, operation) {
    this.#queueOperationsStep.enqueue({
      struct: struct,
      token: token,
      operation: operation,
    });
  }

  static showSteps() {
    while (!this.#queueOperationsStep.isEmpty()) {
      this.awaitTime += 1;

      let { struct, token, operation } = this.#queueOperationsStep.dequeue();

      setTimeout(() => {
        switch (struct) {
          case "input":
            if (operation == "init") {
              interfaceUI.setInitialInputTokens(token);
            } else if (operation == "finish") {
              interfaceUI.finishedOutput();
            }
            break;
          case "output":
            if (operation == "enqueue") {
              interfaceUI.removeInputToken();
              interfaceUI.addOutput(token);
              changeSymbol.toOutput();
            }
            if (operation == "enqueueFromStack") {
              interfaceUI.popStack();
              interfaceUI.addOutput(token);
              changeSymbol.toOutputFromStack();
            }
            break;
          case "stack":
            if (operation == "push") {
              interfaceUI.removeInputToken();
              interfaceUI.pushStack(token);
              changeSymbol.toStack();
            } else if (operation == "pop") {
              interfaceUI.popStack();
              changeSymbol.toOutputFromStack();
            }
            break;
        }
      }, 1000 * this.awaitTime);
    }
  }

  static clearSteps() {
    inputEl.innerHTML = "";
    outputEl.innerHTML = "";
    stackEl.innerHTML = "";
    changeSymbol.toWaiting();
  }
}

export { interfaceUISteps };
