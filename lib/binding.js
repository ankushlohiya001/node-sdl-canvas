const addon = require("bindings")("../build/Release/addon");
const constants = require("./gl/constants");

for (let key in constants) {
  addon.gl[key] = constants[key];
}
module.exports = addon;