import Page from "./page";
import Api from "../services/api";

export default class Project extends Page {
  static tag = "page-project";
  #project;

  constructor() {
    super("project");
    this.setProject();
  }

  setProject() {
    // get project id from url
    const url = location.pathname;
    const regex = "/project_";
    const projectId = url.slice(regex.length);

    // set current project based on project id
    this.#project = Api.getApiResponse.find((project) => {
      return project.id == projectId;
    });

    console.log("set project view to: " + this.#project.id + "!");
  }

  async connectedCallback() {
    await this.renderMarkup();
    this.loadProjectData();
    this.initializeHorizontalScroll();
    this.listenForRouterEvents();
  }

  loadProjectData() {
    document.getElementById("horizontal-scroll").project = this.#project;
    document.getElementById("project-title").innerHTML = this.#project.titel;
    document.getElementById("project-location").innerHTML =
      `${this.#project.plaats},`;
    document.getElementById("project-date").innerHTML = this.#project?.datum;
    document.getElementById("project-data-location").innerHTML =
      this.#project.plaats;
    document.getElementById("project-data-date").innerHTML =
      this.#project.datum;
    document.getElementById("project-data-client").innerHTML =
      this.#project.klant;
  }

  initializeHorizontalScroll() {
    // declare scroll content and initialize scroll info markup
    let scrollContent = {
      scrollInfoMarkup: `
                <div class="text-align-center">
                    <h2 id="img-title" class="test">Title</h2>   
                </div>
            `,
      scrollItems: [],
    };

    // create scroll item for each img from the current project
    this.#project.imgs.forEach((img) => {
      // declare scroll item and initiliaze some variables
      let scrollItem = {
        imgLink: img.mediaLink,
        imgObjectFit: "contain",
        scrollInfo: [],
      };

      // process clean image name from pathname using regex
      const imgTitle = () => {
        const slashIndex = img.name.lastIndexOf("/") + 1;
        const dotIndex = img.name.lastIndexOf(".");
        return img.name.slice(slashIndex, dotIndex);
      };

      // scroll info array
      scrollItem.scrollInfo.push({
        selector: "#img-title",
        value: imgTitle(),
      });

      // push scroll item
      scrollContent.scrollItems.push(scrollItem);
    });

    // initialize ce-horizontal-scroll
    document
      .querySelector("ce-horizontal-scroll")
      .setAttribute("scroll-content", JSON.stringify(scrollContent));
  }
}

customElements.define(Project.getTag, Project);
