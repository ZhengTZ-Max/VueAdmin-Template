const allComponents = require.context(".", false, /\.vue$/);
let res_components = {};
allComponents.keys().forEach((fileName) => {
  let comp = allComponents(fileName);
  res_components[fileName.replace(/^\.\/(.*)\.\w+$/, "$1")] = comp.default;
});
// const ComKeys = Object.keys(res_components);
// ComKeys.map((item, index) => {
//   console.log(res_components[item]);
//   export default {...res_components[item]};
// });
// export default { ...res_components };
export default { ...res_components };
