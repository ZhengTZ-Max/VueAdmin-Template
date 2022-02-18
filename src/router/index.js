import Vue from "vue";
import VueRouter from "vue-router";
import asyncRouter from "./asyncRouter";
import store from "@/store/index.js";
import NProgress from "nprogress";

const whitePage = ["/login"];
const routes = [
  {
    path: "/",
    component:() => import("@/layout/index.vue"),
  },
  {
    path: "/login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/404",
    meta: {
      title: "页面丢失",
    },
    component: () => import("@/views/404.vue"),
  }
];
const router = new VueRouter({
  mode: "history",
  routes,
});
// 路由跳转之前
router.beforeEach((to, from, next) => {
  NProgress.start();
  const auth = $Storage.get("auth");
  console.log(auth);
  if (auth) {
    if (to.path == "/login") {
      next("/");
    } else {
      let routes = store.getters["user/menuList"];
      if (!(routes && routes.length)) {
        store
          .dispatch("user/GenerateRoutes")
          .then((list) => {
            console.log(list);
            let routes = asyncRouter(list);
            routes.map((item, index) => {
              router.addRoute(item);
            });
            router.addRoute({
              path: "*",
              redirect: "/404",
            });
            next({
              ...to,
              replace: true,
            });
          })
          .catch(() => {
            router.addRoute({
              path: "*",
              redirect: "/404",
            });
            console.log("获取路由错误");
          });
      } else {
        next();
      }
    }
  } else {
    if (whitePage.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

//路由跳转之后
router.afterEach(() => {
  NProgress.done();
});

Vue.use(VueRouter);
export default router;
