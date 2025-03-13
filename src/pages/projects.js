import Page from "./page";
import Api from "../services/api";

export default class ProjectsPage extends Page {
  static tag = "page-projects";

  constructor() {
    super("projects");
  }

  async connectedCallback() {
    await this.renderMarkup();
    this.renderProjects();
    this.listenForRouterEvents();
  }

  renderProjects() {
    const projectCollection = document.getElementById("project-collection");

    Api.getApiResponse.forEach((project) => {
      const newProject = document.createElement("div");
      newProject.classList.add("project", "border", "border-grey", "test");

      let hasMainImage = false;
      let mainImage;
      let classObjectFit = "img-cover";

      project.imgs.forEach((img) => {
        if (img.metadata != null && img.metadata.main == "true") {
          mainImage = img.mediaLink;
          hasMainImage = true;
          if (img.metadata.contain == "true") {
            classObjectFit = "img-contain";
          }
        }
      });

      if (hasMainImage) {
        newProject.innerHTML = `
            <a class="block" href="/project_${project.id}" data-spa-link>
                <div class="project-collection-img-wrapper margin-content">
                    <img class="project-collection-img animate-3 ${classObjectFit}" src=${mainImage}>
                </div>
            </a>
            <div class="padding">
              <h3 class="margin-content-small">${project.titel}</h2>
              <p class="inline">${project.plaats},</p>
              <p class="inline">${project.datum}</p>
            </div>
        `;
        projectCollection.appendChild(newProject);
      } else {
        newProject.innerHTML = `
            <a href="/project_${project.id}" data-spa-link>
                <div class="project-collection-img-wrapper margin-content">
                    <svg class="error-svg absolute-centered animate-3 test" width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0-35-10)">
                        <circle cx="200" cy="200" r="192.308" stroke="black" stroke-width="15"/>
                        <path d="M115.763 115.763L284.237 284.237" stroke="black" stroke-width="15" stroke-linecap="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0-35-10">
                        <rect width="400" height="400" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </div>
            </a>
            <h2 class="margin-content-small">${project.titel}</h2>
            <p class="inline">${project.plaats},</p>
            <p class="inline">${project.datum}</p>
        `;
        projectCollection.appendChild(newProject);
      }
    });
  }
}

customElements.define(ProjectsPage.getTag, ProjectsPage);
