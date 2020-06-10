const USER_PROFILE = "USER";
const ADMIN_PROFILE = "ADMIN";

function isAdmin(profile) {
  return profile === ADMIN_PROFILE;
}

function isUser(profile) {
  return profile === USER_PROFILE;
}

module.exports = {
  isAdmin,
  isUser,
  USER_PROFILE,
  ADMIN_PROFILE,
};
