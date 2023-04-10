import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
const customLoader = `<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
<div class="loader"></div>`;

const customError = "<h1>Oops! About isn't working right now</h1>";
const config = {
  mode: "hash",
  routes: [
    {
      type: "application",
      name: "@app/nav",
    },
    {
      type: "route",
      path: "home",
      routes: [
        {
          type: "application",
          name: "@app/home",
          loader: customLoader,
          props: {
            user: { fname: "Jane", lname: "John" },
          },
        },
      ],
      default: false,
    },
    {
      type: "route",
      path: "about",
      routes: [
        {
          type: "application",
          name: "@app/about",
          loader: customLoader,
          error: customError,
        },
      ],
      default: false,
    },
    {
      type: "route",
      default: true,
      routes: [{ type: "#text", value: "404 Not found" }],
    },
  ],
};
const routes = constructRoutes(config);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });
console.log(applications)
applications.forEach(registerApplication);
layoutEngine.activate();
start();
