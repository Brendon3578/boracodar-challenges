/**
 * Uma classe que implementa de uma Fila (Queue).
 */
export default class Queue {
  #itens = [];
  /**
   * Cria uma nova instância da fila vazia.
   */
  constructor() {
    this.#itens = [];
  }

  /**
   * Retorna o tamanho da fila.
   * @returns {number} O número de elementos na fila.
   */
  size() {
    return this.#itens.length;
  }

  /**
   * Verifica se a fila está vazia.
   * @returns {boolean} `true` se a fila estiver vazia, caso contrário, `false`.
   */
  isEmpty() {
    return this.#itens.length === 0;
  }

  /**
   * Adiciona um elemento ao final da fila.
   * @param {*} item - O elemento a ser adicionado à fila.
   * @returns {number} O novo tamanho da fila após a adição do elemento (Pode ser ignorado).
   */
  enqueue(item) {
    return this.#itens.push(item);
  }

  /**
   * Remove e retorna o elemento do início da fila.
   * @returns {*} O elemento removido do início da fila, ou `null` se a fila estiver vazia.
   */
  dequeue() {
    return !this.isEmpty() ? this.#itens.shift() : null;
  }

  /**
   * Retorna o elemento do início da fila sem removê-lo.
   * @returns {*} O elemento do início da fila, ou `null` se a fila estiver vazia.
   */
  peek() {
    return !this.isEmpty() ? this.#itens[0] : null;
  }

  /**
   * Retorna uma representação em string da fila.
   * @returns {string} Uma string que representa os elementos da fila.
   */
  toString() {
    return `${this.#itens.toString()}`;
  }
}
