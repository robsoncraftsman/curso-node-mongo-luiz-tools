const test = require("blue-tape");
const permissions = require("./permissions");
const userProfiles = require("./models/userProfiles");

function runTests() {
  test("Permissions isAuthorized (User => /)", async (t) => {
    const request = {
      user: { profile: userProfiles.USER_PROFILE },
      originalUrl: "/",
    };
    const authorized = permissions.isAuthorized(request);

    t.assert(authorized, "Common users is authorized to access index");
  });

  test("Permissions isAuthorized (Admin => /)", async (t) => {
    const request = {
      user: { profile: userProfiles.ADMIN_PROFILE },
      originalUrl: "/",
    };
    const authorized = permissions.isAuthorized(request);

    t.assert(authorized, "Admin users is authorized to access index");
  });

  test("Permissions isAuthorized (User => /reports)", async (t) => {
    const request = {
      user: { profile: userProfiles.USER_PROFILE },
      originalUrl: "/reports",
    };
    const authorized = permissions.isAuthorized(request);

    t.assert(!authorized, "Common users is not authorized to access reports");
  });

  test("Permissions isAuthorized (Admin => /reports)", async (t) => {
    const request = {
      user: { profile: userProfiles.ADMIN_PROFILE },
      originalUrl: "/reports",
    };
    const authorized = permissions.isAuthorized(request);

    t.assert(authorized, "Admins users authorized to access reports");
  });
}

module.exports = { runTests };
