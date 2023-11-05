/**
 * Uma classe que implementa uma Pilha (Stack).
 */
export default class Stack {
  #itens = [];
  /**
   * Cria uma nova instância da pilha.
   */
  constructor() {
    this.#itens = [];
  }

  /**
   * Verifica se a pilha está vazia.
   * @returns {boolean} `true` se a pilha estiver vazia, caso contrário, `false`.
   */
  isEmpty() {
    return this.#itens.length === 0;
  }

  /**
   * Retorna o tamanho da pilha.
   * @returns {number} O número de elementos na pilha.
   */
  size() {
    return this.#itens.length;
  }

  /**
   * Adiciona um elemento ao topo da pilha.
   * @param {*} item - O elemento a ser adicionado à pilha.
   * @returns {number} O novo tamanho da pilha após a adição do elemento (geralmente é ignorado).
   */
  push(item) {
    return this.#itens.push(item);
  }

  /**
   * Remove e retorna o elemento no topo da pilha.
   * @returns {*} O elemento removido do topo da pilha, ou `null` se a pilha estiver vazia.
   */
  pop() {
    return !this.isEmpty() ? this.#itens.pop() : null;
  }

  /**
   * Retorna o elemento no topo da pilha sem removê-lo.
   * @returns {*} O elemento no topo da pilha, ou `null` se a pilha estiver vazia.
   */
  peek() {
    return !this.isEmpty() ? this.#itens[this.#itens.length - 1] : null;
  }

  /**
   * Retorna uma representação em string da pilha.
   * @returns {string} Uma string que representa os elementos da pilha.
   */
  toString() {
    return `${this.#itens.toString()}`;
  }
}
