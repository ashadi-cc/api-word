//load esm module
require = require("esm")(module)
//load main app file
module.exports = require("./app/main")