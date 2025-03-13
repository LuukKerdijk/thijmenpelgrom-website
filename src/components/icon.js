import CustomElement from "./custom-element";

export default class Button extends CustomElement {
  constructor() {
    super("icon");
  }

  async connectedCallback() {
    await this.renderMarkup();

    let template;
    switch (this.getAttribute("type")) {
      default:
        template = this.shadow.querySelector("#template-icon-arrow").content;
        this.shadow.appendChild(template.cloneNode(true));
        break;
      case "cross":
        template = this.shadow.querySelector("#template-icon-plus").content;
        this.shadow.appendChild(template.cloneNode(true));
        break;
    }

    switch (this.getAttribute("color")) {
      default:
        this.shadow.querySelectorAll("svg *").forEach((el) => {
          el.classList.add("stroke-dark");
        });
        break;
      case "light":
        this.shadow.querySelectorAll("svg *").forEach((el) => {
          el.classList.add("stroke-light");
        });
        break;
    }

    switch (this.getAttribute("stroke")) {
      default:
        this.shadow.querySelectorAll("svg *").forEach((el) => {
          el.classList.add("stroke-regular");
        });
        break;
      case "thin":
        this.shadow.querySelectorAll("svg *").forEach((el) => {
          el.classList.add("stroke-thin");
        });
        break;
      case "thick":
        this.shadow.querySelectorAll("svg *").forEach((el) => {
          el.classList.add("stroke-thick");
        });
        break;
    }

    this.shadow.querySelector("svg").style.transform =
      `rotate(${this.getAttribute("rotate")}deg)`;

    // console.log(this);
  }
}

customElements.define("ce-icon", Button);
