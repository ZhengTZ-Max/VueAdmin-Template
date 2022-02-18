//user.js
import { getMenuList } from "@/api/system.js";
import { filterMenuList } from "@/utils/utils";
const state = {
  auth: "",
  menuList: [],
};
const getters = {
  auth(state) {
    return state.auth;
  },
  menuList(state) {
    return state.menuList;
  },
};
const mutations = {
  setAuth(state, token) {
    state.auth = token;
  },
  setMenuList(state, list) {
    state.menuList = list;
  },
};
const actions = {
  actionAuth(context, token) {
    context.commit("setAuth", token);
  },
  actionMenuList(context, list) {
    context.commit("setMenuList", list);
  },
  GenerateRoutes(context, info) {
    return new Promise(async (resolve, reject) => {
      try {
        // let params = {
        //   navigationType: "工作计划",
        //   siteId: sessionStorage.getItem("siteId"),
        //   userId: sessionStorage.getItem("userId"),
        // };
        // const res = await getMenuList(params);
        const expandRoutes = [
          {
            title: "首页",
            path: "index",
            icon: "el-icon-monitor",
            children: [
              {
                title: "首页",
                path: "/index",
                component: "odometer",
              },
            ],
          },
          {
            title: "测试模块",
            path: "/meta",
            redirect: "meta/index",
            icon: "el-icon-monitor",
            showMenu:true,
            children: [
              {
                title: "测试",
                path: "/meta/index",
                component: "meta/index",
              },
            ],
          },
          {
            title: "菜单管理",
            path: "/system",
            redirect: "/menu-list",
            icon: "el-icon-setting",
            children: [
              {
                title: "菜单列表",
                path: "/menu-list",
                component: "system/menu-list",
              },
              {
                title: "角色列表",
                path: "/role-list",
                component: "system/role-list",
              },
              {
                title: "用户列表",
                path: "/user-list",
                component: "system/user-list",
              },
            ],
          },
        ];
        let list = filterMenuList(expandRoutes);
        context.commit("setMenuList", list);
        resolve(list);
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default {
  namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions,
};
