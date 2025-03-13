import Page from "./page";

export default class Class extends Page {
    static tag = "page-name"
    #name;

    constructor() {
        super("name");
    }

    async connectedCallback() {
    }
}

customElements.define(Class.getTag, Class);
