export default class Stack {
  constructor() {
    this.#itens = [];
  }

  #itens = [];

  isEmpty() {
    return this.#itens.length == 0;
  }

  push(item) {
    return this.#itens.push(item);
  }

  pop() {
    if (!this.isEmpty()) return this.#itens.pop();
  }

  peek() {
    return !this.isEmpty() ? this.#itens[this.#itens.length - 1] : null;
  }

  size() {
    return this.#itens.length;
  }
}
