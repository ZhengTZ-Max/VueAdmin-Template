export default (path) => (resolve) =>
require(["@/views/" + path + ".vue"], resolve);