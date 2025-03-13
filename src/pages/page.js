import Router from "../services/router";

export default class Page extends HTMLElement {
  static tag;
  #name;
  #markupSource;

  static get getTag() {
    return this.tag;
  }

  constructor(name) {
    super();
    this.#name = name;
    this.#markupSource = `/assets/html/pages/${this.#name}.html`;
    document.title = name;
    console.log(`page: "${this.#name}" connected!`);
  }

  async renderMarkup() {
    this.innerHTML = await (await fetch(this.#markupSource)).text();
  }

  listenForRouterEvents() {
    Router.listenForRouterEvents();
  }
}
