import CustomElement from "custom-element";

export default class Class extends CustomElement {
  constructor() {
    super("name");
  }

  async connectedCallback() {
    await this.renderMarkup();
  }
}

customElements.define(Class.getName, Class);
