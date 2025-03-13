import Router from "../services/router";
import CustomElement from "./custom-element";

export default class HorizontalScroll extends CustomElement {
  static observedAttributes = ["scroll-content"];
  project;
  scrollIndex = 0;
  scrollContent;
  // = {
  //     scrollInfoMarkup: ``,
  //     scrollItems: [ // array of scrollItems
  //         {
  //             imgLink,
  //             imgObjectFit,
  //             scrollInfo: [
  //                 {
  //                     elementId,
  //                     value,
  //                 },
  //             ]
  //         },
  //     ],
  // }

  constructor() {
    super("horizontal-scroll");
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name == "scroll-content") {
      await this.renderMarkup();

      this.scrollContent = await JSON.parse(
        this.getAttribute("scroll-content"),
      );

      if (this.scrollContent.scrollItems?.length > 0) {
        this.shadow.querySelector("#horizontal-scroll-info").innerHTML =
          this.scrollContent.scrollInfoMarkup;
        Router.listenForRouterEvents(this.shadow); //new router link has been dynamically rendered, which has no event listener yet
        this.renderScrollItems();
        this.renderSelectedScrollInfo();
        this.renderSelectedStyling();
        setTimeout(() => {
          this.buttonEvents();
        }, 1000);
      } else {
        // loadEmptyImgs()
      }
    }
  }

  async connectedCallback() {
    // function loadEmptyImgs() {
    //     const horizontalScroll = document.querySelector("#horizontal-scroll");
    //     horizontalScroll.innerHTML = `
    //         <div class="scroll-element border border-radius">
    //             <div class="error flex-col flex-gap-small flex-align-center absolute-centered">
    //                 <svg class="test" width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                     <g clip-path="url(#clip0-35-10)">
    //                     <circle cx="200" cy="200" r="192.308" stroke="black" stroke-width="15"/>
    //                     <path d="M115.763 115.763L284.237 284.237" stroke="black" stroke-width="15" stroke-linecap="round"/>
    //                     </g>
    //                     <defs>
    //                     <clipPath id="clip0-35-10">
    //                     <rect width="400" height="400" fill="white"/>
    //                     </clipPath>
    //                     </defs>
    //                 </svg>
    //                 <p class="text-align-center test">Project has no images...</p>
    //             </div>
    //         </div>
    //     `;
    // }
  }

  renderScrollItems() {
    let markup;

    this.scrollContent.scrollItems.forEach((item, index) => {
      let imgMarkup = `
          <div id="scroll-element-${index}" class="scroll-element test">
              <img src="${item.imgLink}" style="object-fit: contain"></img>
          </div>
      `;

      markup ? (markup = markup + imgMarkup) : (markup = imgMarkup);
    });

    markup
      ? (this.shadow.querySelector("#horizontal-scroll").innerHTML = markup)
      : console.log("no imgs were available");
  }

  buttonEvents() {
    const self = this;

    const horizontalScroll = this.shadow.querySelector("#horizontal-scroll");
    horizontalScroll.style.height = // apply style height to horizontal-scroll to prevent abrupt first animation
      self.shadow.querySelector(
        `#scroll-element-${self.scrollIndex.toString()} > img`,
      ).offsetHeight + "px";

    let btnReady = true;

    this.shadow.querySelector("#btn-left").addEventListener("click", () => {
      if (btnReady && this.scrollIndex > 0) {
        btnReady = false;

        this.removeSelectedStyling();

        this.shadow
          .querySelector(`#scroll-element-${this.scrollIndex.toString()}`)
          .addEventListener(whichTransitionEvent(), scrollLeft); // execute scroll left when styling removal animation has ended

        setTimeout(() => {
          btnReady = true;
        }, 1500);
      }
    });

    this.shadow.querySelector("#btn-right").addEventListener("click", () => {
      if (
        btnReady &&
        this.scrollIndex < this.scrollContent.scrollItems.length - 1
      ) {
        btnReady = false;

        this.removeSelectedStyling();

        this.shadow
          .querySelector(`#scroll-element-${this.scrollIndex.toString()}`)
          .addEventListener(whichTransitionEvent(), scrollRight); // execute scroll left when styling removal animation has ended to prevent choppy animation

        setTimeout(() => {
          btnReady = true;
        }, 1500);
      }
    });

    function whichTransitionEvent() {
      var t,
        el = self.shadow.querySelector(
          `#scroll-element-${self.scrollIndex.toString()} > img`,
        );

      var transitions = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd",
      };

      for (t in transitions) {
        if (el.style[t] !== undefined) {
          return transitions[t];
        }
      }
    }

    function scrollLeft() {
      // remove animation ended event listener to prevent multiplied response
      self.shadow
        .querySelector(`#scroll-element-${self.scrollIndex.toString()}`)
        .removeEventListener(whichTransitionEvent(), scrollLeft);

      horizontalScroll.scrollLeft -= self.shadow.querySelector(
        `#scroll-element-${self.scrollIndex.toString()}`,
      ).offsetWidth;

      self.scrollIndex -= 1;

      setTimeout(() => {
        self.renderSelectedStyling();
        horizontalScroll.style.height =
          self.shadow.querySelector(
            `#scroll-element-${self.scrollIndex.toString()} > img`,
          ).offsetHeight + "px";
      }, 300);

      self.renderSelectedScrollInfo();
    }

    function scrollRight() {
      self.shadow
        .querySelector(`#scroll-element-${self.scrollIndex.toString()}`)
        .removeEventListener(whichTransitionEvent(), scrollRight);

      horizontalScroll.scrollLeft += self.shadow.querySelector(
        `#scroll-element-${self.scrollIndex.toString()}`,
      ).offsetWidth;

      self.scrollIndex += 1;

      setTimeout(() => {
        self.renderSelectedStyling();
        horizontalScroll.style.height =
          self.shadow.querySelector(
            `#scroll-element-${self.scrollIndex.toString()} > img`,
          ).offsetHeight + "px";
      }, 300);

      self.renderSelectedScrollInfo();
    }

    // console.log(this);
  }

  removeSelectedStyling() {
    const img = this.shadow.querySelector(
      `#scroll-element-${this.scrollIndex.toString()} > img`,
    );
    img.style.transform = "scale(0.9)";
  }

  renderSelectedStyling() {
    const img = this.shadow.querySelector(
      `#scroll-element-${this.scrollIndex.toString()} > img`,
    );
    img.style.transform = "scale(1)";
  }

  renderSelectedScrollInfo() {
    this.scrollContent.scrollItems[this.scrollIndex].scrollInfo.forEach(
      (infoElement) => {
        if (infoElement.attribute) {
          this.shadow.querySelector(infoElement.selector)[
            infoElement.attribute
          ] = infoElement.value;
        } else {
          this.shadow.querySelector(infoElement.selector).innerHTML =
            infoElement.value;
        }
      },
    );
  }
}

customElements.define(`ce-horizontal-scroll`, HorizontalScroll);
