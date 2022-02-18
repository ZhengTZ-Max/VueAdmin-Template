import Vue from "vue";
import Vuex from "vuex";

import ElementUI from "element-ui";
import "./icons";
import router from "./router/index";
import App from "./App";

import store from "./store/index";
import {
  Storage
} from "./utils/utils";

import "nprogress/nprogress.css";
import "element-ui/lib/theme-chalk/index.css";
import "./style/reset.css";
import "./style/comment.scss";

window.$Storage = Storage; // window 下注册Store存储对象
window.$base = process.env.VUE_APP_API_BASE_URL;
Vue.use(ElementUI);
Vue.use(Vuex);

window.Msg = ElementUI.Message;
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");