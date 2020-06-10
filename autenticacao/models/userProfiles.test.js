const test = require("blue-tape");
const userProfiles = require("./userProfiles");

function runTests() {
  test("UserProfiles is User", async (t) => {
    const isUser = userProfiles.isUser(userProfiles.USER_PROFILE);

    t.assert(isUser, "Is user");
  });

  test("UserProfiles is not User", async (t) => {
    const isUser = userProfiles.isUser(userProfiles.ADMIN_PROFILE);

    t.assert(!isUser, "Is not user");
  });

  test("UserProfiles is Admin", async (t) => {
    const isAdmin = userProfiles.isAdmin(userProfiles.ADMIN_PROFILE);

    t.assert(isAdmin, "Is admin");
  });

  test("UserProfiles is not Admin", async (t) => {
    const isAdmin = userProfiles.isAdmin(userProfiles.USER_PROFILE);

    t.assert(!isAdmin, "Is not admin");
  });
}

module.exports = { runTests };
