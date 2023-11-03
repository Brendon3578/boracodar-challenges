export default class Stack {
  constructor() {
    this.#itens = [];
  }

  #itens = [];

  push(item) {
    return this.#itens.push(item);
  }

  pop() {
    if (!this.isEmpty) return this.#itens.pop();
  }

  isEmpty() {
    return this.#itens.length == 0;
  }

  peek() {
    return !this.isEmpty() ? this.#itens[this.#itens.length] : null;
  }

  size() {
    return this.#itens.length;
  }
}
