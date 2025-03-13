import Api from "./services/api.js";
// import { SanityApi } from './services/sanityApi.js';
import Router from "./services/router.js";
import "./components/horizontal.scroll.js";
import "./components/button.js";
import "./components/icon.js";
import "@lottiefiles/lottie-player";

document.addEventListener("DOMContentLoaded", async () => {
  // FETCH API
  await Api.fetch();

  // await SanityApi.fetchProjects();
  // console.log(SanityApi.getProjects())

  // disable animation
  document.querySelector("#loading-animation").classList.add("hidden");

  // NAV BAR
  // open and close dropdown when hamburger icon is clicked
  const hamburgerMenu = document.querySelector("#hamburger-menu");
  const hamburgerMenuDropdown = document.querySelector("#nav");
  let hamburgerOpen = false;

  hamburgerMenu.addEventListener("click", () => {
    if (!hamburgerOpen) {
      hamburgerOpen = true;
      hamburgerMenuDropdown.style.cssText = `
        height: auto;
      `;
    } else {
      hamburgerOpen = false;
      hamburgerMenuDropdown.style.cssText = `
        height: var(--nav-margin);
      `;
    }
  });

  // close hambuger dropdown when clicked outside of nav
  document.addEventListener("click", (e) => {
    if (hamburgerOpen && e.target.closest("#nav") == null) {
      hamburgerOpen = false;
      hamburgerMenuDropdown.style.cssText = `
        height: var(--nav-margin);
      `;
    }
  });

  // close hambuger dropdown when data-spa-link clicked
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-spa-link]")) {
      hamburgerOpen = false;
      hamburgerMenuDropdown.style.cssText = `
        height: var(--nav-margin);
      `;
    }
  });

  // hide nav and close hamburger dropdown when scrolling down
  const nav = document.querySelector("#nav");
  let lastScrollTop;

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      nav.style.top = "calc(-1 * var(--nav-margin))";

      if (hamburgerOpen) {
        hamburgerOpen = false;
        hamburgerMenuDropdown.style.cssText = `
          height: var(--nav-margin);
        `;
      }
    } else {
      nav.style.top = "0";
    }

    lastScrollTop = scrollTop;
  });

  // SMOOTH SCROLLING TO ELEMENTS ON CURRENT PAGE (a-elements with syntax "href=#...")
  document.addEventListener("click", (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      document.querySelector(e.target.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    }
  });

  // ROUTER
  Router.init();
  Router.route();
});
