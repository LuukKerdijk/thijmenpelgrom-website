import Api from "./api";
import HomePage from "../pages/home";
import ProjectsPage from "../pages/projects";
import Project from "../pages/project";

export default class Router {
  static init() {
    this.routes = [
      { path: "/", page: HomePage },
      { path: "/projects", page: ProjectsPage },
    ];

    if (Api.getApiSuccess) {
      Api.getApiResponse.forEach((project) => {
        this.routes.push({ path: `/project_${project.id}`, page: Project });
      });
    }

    window.addEventListener("popstate", () => {
      this.route();
    });
  }

  static route() {
    const potentialMatches = this.routes.map((route) => {
      return {
        route: route,
        isMatch: location.pathname === route.path,
      };
    });

    let match = potentialMatches.find(
      (potentialMatch) => potentialMatch.isMatch,
    );

    if (!match) {
      match = {
        route: this.routes[0],
        isMatch: true,
      };
    }

    const route = document.getElementById("route");
    const page = document.createElement(match.route.page.getTag);
    route.innerHTML = "";
    route.appendChild(page);
  }

  static listenForRouterEvents(element = document) {
    const routerLinks = element.querySelectorAll("[data-spa-link]");
    //console.log(routerLinks);
    routerLinks.forEach((routerLink) => {
      routerLink.addEventListener("click", this.changeUrl); //callback reference to prevent event listener duplication
    });
  }

  static changeUrl(e) {
    console.log(e.target);
    e.preventDefault();
    history.pushState(null, null, e.target.href);
    Router.route();

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" }); //10ms timeout because instant scroll did not work
    }, 10);
  }
}
