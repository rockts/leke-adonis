"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

Route.resource("posts", "PostController");
// .except(["index"])
// .only(["index", "show"])
// .apiOnly();

Route.get("/list-of-users", () => "List of users.").as("users.index");

Route.get("/users", ({ request }) => {
  switch (request.format()) {
    case "json":
      return [{ name: "gaopeng" }, { name: "leke" }];
    default:
      return `
      - gaopeng
      - leke
    `;
  }
}).formats(["json", "html"], true);

Route
  .group(() => {
    Route.get('users', () => 'Manage users')
    Route.get('posts', () => 'Manage posts')
})
  .prefix('admin')
