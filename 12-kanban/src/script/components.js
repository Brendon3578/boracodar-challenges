class Sidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <sidebar class="text-lg">
        Hello World
        
      </sidebar>
    `;
  }
}

customElements.define("main-sidebar", Sidebar);
