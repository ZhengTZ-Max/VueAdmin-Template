import axios from "axios";
import { Message } from "element-ui";
let msg = Message;
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 60000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error) => {
  console.log("请求失败 --- ", error.response);
  if (error.response) {
    const data = error.response;
    console.log(data);
    if (data.status == 400) {
      msg.error('请求错误~');
    } else if (data.status == 401) {
      msg.error("无效的Token~");
      $Storage.remove("auth");
      // location.reload();
    } else if (data.status == 405) {
      msg.error("请求方式不存在~");
    } else if (data.status == 500) {
      msg.error("服务器错误~");
    } else if (data.status == 503) {
      msg.error("服务器部分资源不可用~");
    }else if (data.status == 403) {
      msg.error("你没有访问的权限~");
    } else {
      msg.error("异常出错~");
    }
  } else {
    msg.error(error.response.data);
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config) => {
  const auth = $Storage.get("auth");
  // 如果 token 存在
  if (auth) {
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    config.headers["Authorization"] = `bearer ${auth}`;
  }
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response) => {
  return response.data;
}, errorHandler);

export default request;
