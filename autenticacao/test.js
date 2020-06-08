require("dotenv-safe").config();

require("./models/db.test").runTests();

require("./models/userModel.test").runTests();
