import axios from "axios";

export default class Api {
  static #apiResponse;
  static #apiSuccess;

  static get getApiResponse() {
    return this.#apiResponse;
  }

  static get getApiSuccess() {
    return this.#apiSuccess;
  }

  static async fetch() {
    console.log("FETCHING API...");

    const apiUrl =
      "https://europe-west4-thijmen-f9e31.cloudfunctions.net/getProjects";
    //const apiUrl = ("http://127.0.0.1:3000/thijmen-f9e31/europe-west4/getProjects");
    // const apiUrl = 'http://testerror:3000/';

    try {
      const res = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.#apiResponse = res.data.projects;
      this.#apiSuccess = true;
      console.log("API SUCCESS!");
      console.log(this.#apiResponse);
    } catch (error) {
      this.#apiSuccess = false;
      console.error(error);
    }
  }
}
