export default class CustomElement extends HTMLElement {
  name;

  constructor(name) {
    super();
    this.name = name;
    this.shadow = this.attachShadow({ mode: "open" });
  }

  async renderMarkup() {
    this.shadow.innerHTML = await (
      await fetch(`/assets/html/components/${this.name}.html`)
    ).text();
  }

  async connectedCallback() {}
}
