import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "./components/common/toast";
import FastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";
Vue.config.productionTip = false;
//解决移动端300mm 延迟问题
FastClick.attach(document.body);
// 安装toast
Vue.use(toast);
// 安装图片懒加载
Vue.use(VueLazyLoad, {
  loading: require("./assets/img/common/placeholder.png"),
});

// 为$bus传入值(事件总线)
Vue.prototype.$bus = new Vue();
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
