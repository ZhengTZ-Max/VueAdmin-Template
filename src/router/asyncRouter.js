import Layout from "@/layout/index.vue";
import _import from "./_import";
const asyncRouter = (tree) => {
  return tree.map((item, index) => {
    if (item.children && item.children.length) {
      asyncRouter(item.children);
    }
    if (item.component == "Layout") {
      item.component = Layout;
    } else if (item.component) {
      item.component = _import(item.component);
    }
    return item;
  });
};
export default asyncRouter;
