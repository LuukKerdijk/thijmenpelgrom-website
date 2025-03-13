import Page from "./page";
import Api from "../services/api";

export default class HomePage extends Page {
  static tag = "page-home";

  constructor() {
    super("home");
  }

  async connectedCallback() {
    await this.renderMarkup();
    this.interactiveHeroSection();
    this.initializeHorizontalScroll();
    this.listenForRouterEvents();
  }

  interactiveHeroSection() {
    // MOBILE: interactive hero section slide because of little horizontal space
    const heroContent = document.getElementById("hero-content");
    const gridLeft = document.querySelectorAll(".grid-left");
    const gridRight = document.querySelectorAll(".grid-right");
    const thijmenpelgromBg = document.getElementById("thijmenpelgrom-bg");
    const dehaaksehoekBg = document.getElementById("dehaaksehoek-bg");
    const heroBtn = document.getElementById("hero-btn");
    const heroBtnText = document.getElementById("hero-btn-text");
    let heroBtnClicked = false;

    heroBtn.addEventListener("click", (e) => {
      if (!heroBtnClicked) {
        heroBtnClicked = true;

        heroBtn.style.cssText = `
                    transform: scale(1);
                `;
        heroBtnText.style.cssText = `
                    position: absolute;
                    pointer-events: none;
                    opacity: 0;
                `;
        thijmenpelgromBg.style.cssText = `
                    width: calc(var(--btn-size) / 2 + var(--margin-section-inner));
                    background-image: none;
                `;
        dehaaksehoekBg.style.cssText = `
                    width: calc(100% - var(--btn-size) / 2 - var(--margin-section-inner));
                    background-image: url("./static/dehaaksehoek-bg.png");
                `;
        heroContent.style.cssText = `
                    grid-template-columns: 0 100%;
                `;
        gridLeft.forEach((e) => {
          e.style.cssText = `
                        height: 0px;
                        opacity: 0;
                    `;
        });
        gridRight.forEach((e) => {
          e.style.cssText = `
                        height: auto;
                        opacity: 100;
                    `;
        });
      } else {
        heroBtnClicked = false;

        heroBtn.style.cssText = `
                    transform: scale(-1);
                `;
        heroBtnText.style.cssText = `
                    position: block;
                    pointer-events: auto;
                    opacity: 100;
                `;
        thijmenpelgromBg.style.cssText = `
                    width: calc(100% - var(--btn-size) / 2 - var(--margin-section-inner));
                    background-image: url("./static/thijmenpelgrom-bg.jpg");
                `;
        dehaaksehoekBg.style.cssText = `
                    width: calc(var(--btn-size) / 2 + var(--margin-section-inner));
                    background-image: none;
                `;
        heroContent.style.cssText = `
                    grid-template-columns: 100% 0;
                `;
        gridLeft.forEach((e) => {
          e.style.cssText = `
                        height: auto;
                        opacity: 100;
                    `;
        });
        gridRight.forEach((e) => {
          e.style.cssText = `
                        height: 0px;
                        opacity: 0;
                    `;
        });
      }
    });

    // DESKTOP MODE: empty dynamicly assigned css, media query will take over
    window.matchMedia("(min-width: 1300px)").addEventListener("change", (e) => {
      if (e.currentTarget.matches) {
        heroBtnClicked = false;

        heroBtn.style.cssText = ``;
        heroBtnText.style.cssText = ``;
        thijmenpelgromBg.style.cssText = ``;
        dehaaksehoekBg.style.cssText = ``;
        heroContent.style.cssText = ``;
        gridLeft.forEach((e) => {
          e.style.cssText = ``;
        });
        gridRight.forEach((e) => {
          e.style.cssText = ``;
        });
      }
    });
  }

  initializeHorizontalScroll() {
    let scrollContent = {
      scrollInfoMarkup: `
        <div class="flex-col"> 
          <h2 id="project-title" class="test">Title</h2>
          <div class="test">
              <p id="project-location" class="inline bold test">Location,</p>
              <p id="project-date" class="inline bold test">Date</p>
          </div>
          <div>
              <p id="project-description" class="test">Project description</p>
              <p class="p3 test">. . .</p>                    
          </div>
          <a id="project-link" class="flex-align-self" href="/" data-spa-link>
              <ce-button type="primary-text" icon="arrow"><span slot="text">View project!</span></ce-button>                
          </a>      
        </div>
      `,
      scrollItems: [],
    };

    Api.getApiResponse.forEach((project) => {
      let scrollItem = {
        imgLink: "",
        imgObjectFit: "",
        scrollInfoMarkup: ``,
        scrollInfo: [],
      };

      // get main image, if available
      project.imgs.forEach((img) => {
        if (img.metadata?.main == "true") {
          scrollItem.imgLink = img.mediaLink;

          // set image to contain, if specified in GCP storage
          if (img.metadata.contain == "true") {
            scrollItem.imgObjectFit = "contain";
          } else {
            scrollItem.imgObjectFit = "cover";
          }
        }
      });

      // scroll info array
      scrollItem.scrollInfo.push(
        {
          selector: "#project-title",
          value: project.titel,
        },
        {
          selector: "#project-location",
          value: `${project.plaats},`,
        },
        {
          selector: "#project-date",
          value: project.datum,
        },
        {
          selector: "#project-description",
          value: project.beschrijving,
        },
        {
          selector: "#project-link",
          attribute: "href",
          value: `/project_${project.id}`,
        },
      );

      // push scroll item
      scrollContent.scrollItems.push(scrollItem);
    });

    document
      .querySelector("ce-horizontal-scroll")
      .setAttribute("scroll-content", JSON.stringify(scrollContent));
  }
}

customElements.define(HomePage.getTag, HomePage);
