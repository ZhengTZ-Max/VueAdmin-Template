import request from "@/utils/request.js";
import Qs from "qs";
let API = {
  // 用户模块
  getUserInfo: "/api-m/multiuser-anon/getUserInfById",
  getUserList: "/api-m/multiuser-anon/fuzzySearch2",
  getUserCurrent: "/api-m/users/current",
  // 部门列表
  getDepartmentList: "/api-m/erpDepartmentInfo/selectAllByPaging2",
  selectDepartmentType: '/api-m/erpDepartmentInfo/selectByCondition',
  selectAllByUserId: '/api-m/taskNeedToDo/selectAllByUserId',
  selectByPrimaryKey: '/api-m/erpDepartmentInfo/selectByPrimaryKey'
};

/**
 * @description 获取当前登录人部门信息
 * @author 李丹阳
 * @date 2021-11-21 11：11：59
 * @export
 * @param {*} data
 * @returns {*}  
 */
export function selectByPrimaryKey(data) {
  return request({
    url: API.selectByPrimaryKey,
    method: "post",
    data: Qs.stringify(data),
  });
}



/**
 * @description: 获取部门列表
 * @Date: 2021-09-18 15:31:25
 * @param {*}
 * @return {*}
 * @author: 郑智卿
 */
export function fetchDepartmentList(data) {
  return request({
    url: API.getDepartmentList,
    method: "post",
    data,
  });
}
/**
 * @description: 获取用户信息
 * @Date: 2021-09-18 15:31:25
 * @param {*}
 * @return {*}
 * @author: 郑智卿
 */
export function fetchUserCurrent(data) {
  return request({
    url: API.getUserCurrent,
    method: "get",
    params: data,
  });
}
/**
 * @description: 获取用户列表
 * @Date: 2021-09-18 15:31:25
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
 * @description: 获取用户信息
 * @Date: 2021-09-18 15:31:25
 * @param {*}
 * @return {*}
 * @author: 郑智卿
 */
export function fetchUserInfo(data) {
  return request({
    url: API.getUserInfo,
    method: "get",
    params: data,
  });
}
/**
 * @description  查询部门下的项目部门
 * @author 李丹阳
 * @date 2021-10-12 11：10：56
 * @export
 * @param {*} data
 * @returns {*}  
 */
export function selectDepartmentType(data) {
  return request({
    url: API.selectDepartmentType,
    method: "post",
    data,
  });
}

/**
 * @description  小叮当通知
 * @author 李丹阳
 * @date 2021-10-12 04：10：16
 * @export
 * @param {*} data
 * @returns {*}  
 */
export function selectAllByUserId(data) {
  return request({
    url: API.selectAllByUserId,
    method: "post",
    data,
  });
}