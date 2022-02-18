import request from "@/utils/request.js";

let API = {
  // 角色模块
  getRoleList: "/api/user/role/list",
  saveRole: "/api/user/role/save",
  updateRole: "/api/user/role/update",
  deleteRole: "/api/user/role/delete",
  getAll: "/api//user/role/getRoleAll",
  // 用户模块
  getUserList: "/api/user/user/list",
  saveUser: "/api/user/user/save",
  updateUser: "/api/user/user/update",
  deleteUser: "/api/user/user/delete",
  // 菜单模块
  // getMenuTree: "/api/user/menu/tree",
  getMenuTree: "/api-m/menuNavigation/selectBackstageMenu",
  saveMenu: "/api/user/menu/save",
  updateMenu: "/api/user/menu/update",
  deleteMenu: "/api/user/menu/delete",


};

/**
 * @description: 获取全部角色列表
 * @Date: 2021-09-18 15:31:25
 * @param {*}
 * @return {*}
 * @author: 郑智卿
 */
export function fetchAllRoles(data) {
  return request({
    url: API.getAll,
    method: "post",
    data,
  });
}

/**
 * @description: 删除角色
 * @Date: 2021-09-18 15:31:25
 * @param {*}
 * @return {*}
 * @author: 郑智卿
 */
export function deleteRole(data) {
  return request({
    url: API.deleteRole,
    method: "post",
    data,
  });
}

/**
 * @description: 编辑角色
 * @Date: 2021-09-18 15:31:25
 * @param {*}
 * @return {*}
 * @author: 郑智卿
 */
export function updateRole(data) {
  return request({
    url: API.updateRole,
    method: "post",
    data,
  });
}
/**
 * @description: 添加角色
 * @Date: 2021-09-18 15:31:25
 * @param {*}
 * @return {*}
 * @author: 郑智卿
 */
export function insertRole(data) {
  return request({
    url: API.saveRole,
    method: "post",
    data,
  });
}

/**
 * @description: 获取角色权限列表
 * @Date: 2021-09-18 15:31:25
 * @param {*}
 * @return {*}
 * @author: 郑智卿
 */
export function getRoleList(data) {
  return request({
    url: API.getRoleList,
    method: "post",
    data,
  });
}

/**
 * @description: 删除用户
 * @Date: 2021-09-18 15:31:25
 * @param {*}
 * @return {*}
 * @author: 郑智卿
 */
export function deleteUser(data) {
  return request({
    url: API.deleteUser,
    method: "post",
    data,
  });
}

/**
 * @description: 编辑用户信息
 * @Date: 2021-09-18 15:18:16
 * @param {*} data
 * @return {*}
 * @author: 郑智卿
 */
export function updateUser(data) {
  return request({
    url: API.updateUser,
    method: "post",
    data,
  });
}

/**
 * @description: 新增用户信息
 * @Date: 2021-09-18 11:36:22
 * @param {*}
 * @return {*}
 * @author: 郑智卿
 */
export function insertUser(data) {
  return request({
    url: API.saveUser,
    method: "post",
    data,
  });
}

/**
 * @description: 查询菜单路由列表
 * @Date: 2021-09-18 11:36:22
 * @param {*}
 * @return {*}
 * @author: 郑智卿
 */
export function fetchUserList(data) {
  return request({
    url: API.getUserList,
    method: "post",
    data,
  });
}
/**
 * @description: 删除菜单路由
 * @Date: 2021-09-18 09:52:09
 * @param {*} data
 * @return {*}
 * @author: 郑智卿
 */
export function deleteMenu(data) {
  return request({
    url: API.deleteMenu,
    method: "post",
    data,
  });
}

/**
 * @description: 编辑菜单路由
 * @Date: 2021-09-18 09:52:09
 * @param {*} data
 * @return {*}
 * @author: 郑智卿
 */
export function updateMenu(data) {
  return request({
    url: API.updateMenu,
    method: "post",
    data,
  });
}

/**
 * @description: 新增菜单路由
 * @Date: 2021-09-18 09:51:27
 * @param {*} data
 * @return {*}
 * @author: 郑智卿
 */
export function addMenu(data) {
  return request({
    url: API.saveMenu,
    method: "post",
    data,
  });
}

// /**
//  * @description: 获取菜单属性结构
//  * @Date: 2021-09-18 09:51:27
//  * @param {*} data
//  * @return {*}
//  * @author: 郑智卿
//  */
export function getMenuList(data) {
  // console.log(data);
  return request({
    url: API.getMenuTree,
    method: "post",
    data,
  });
}

