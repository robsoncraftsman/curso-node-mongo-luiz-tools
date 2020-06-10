const userProfiles = require("./models/userProfiles");

function isAuthorized(request) {
  const user = request.user;
  if (!user) return false;

  const profile = user.profile;
  const originalUrl = request.originalUrl;

  const isUser = userProfiles.isUser(profile);
  const isAdmin = userProfiles.isAdmin(profile);

  if (originalUrl.startsWith("/reports")) {
    return isAdmin;
  }
  return isUser || isAdmin;
}

module.exports = { isAuthorized };
