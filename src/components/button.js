import CustomElement from "./custom-element";

export default class Button extends CustomElement {
  constructor() {
    super("button");
  }

  async connectedCallback() {
    await this.renderMarkup();

    switch (this.getAttribute("type")) {
      default:
        this.shadow.querySelector("#btn").classList.add("btn-primary");
        this.querySelector("span")?.classList.add("hidden");
        break;
      case "secondary":
        this.shadow.querySelector("#btn").classList.add("btn-secondary");
        this.querySelector("span")?.classList.add("hidden");
        break;
      case "primary-text":
        this.shadow.querySelector("#btn").classList.add("btn-primary-text");
        break;
      case "secondary-text":
        this.shadow.querySelector("#btn").classList.add("btn-secondary-text");
        this.querySelector("span")?.classList.add("p-small");
        break;
    }

    if (!this.getAttribute("icon")) {
      this.shadow.querySelector("ce-icon").classList.add("hidden");
    } else {
      this.shadow
        .querySelector("ce-icon")
        .setAttribute("type", this.getAttribute("icon"));
    }

    this.shadow
      .querySelector("ce-icon")
      .setAttribute("rotate", this.getAttribute("rotate"));

    switch (this.getAttribute("color")) {
      default:
        if (
          this.getAttribute("type") == undefined ||
          this.getAttribute("type") == "primary-text"
        ) {
          this.shadow.querySelector("#btn").classList.add("background-dark");
          this.querySelector("span")?.classList.add("text-light");
          this.shadow.querySelector("ce-icon")?.setAttribute("color", "light");
        } else {
          this.shadow.querySelector("#btn").classList.add("border-dark");
          this.querySelector("span")?.classList.add("text-dark");
        }
        break;
      case "light":
        if (
          this.getAttribute("type") == undefined ||
          this.getAttribute("type") == "primary-text"
        ) {
          this.shadow.querySelector("#btn").classList.add("background-light");
          this.querySelector("span")?.classList.add("text-dark");
        } else {
          this.shadow.querySelector("#btn").classList.add("border-light");
          this.querySelector("span")?.classList.add("text-light");
          this.shadow.querySelector("ce-icon")?.setAttribute("color", "light");
        }
        break;
    }

    // console.log(this);
  }
}

customElements.define("ce-button", Button);
