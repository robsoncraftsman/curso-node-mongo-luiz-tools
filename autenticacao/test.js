require("dotenv-safe").config();

require("./models/db.test").runTests();

require("./models/userModel.test").runTests();

require("./mail.test").runTests();

require("./models/userProfiles.test").runTests();

require("./permissions.test").runTests();
