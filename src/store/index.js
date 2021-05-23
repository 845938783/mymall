import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

// 1.安装插件
Vue.use(Vuex);

// 2.创建Store对象
const state = {
  cartList: [],
};
const store = new Vuex.Store({
  state,
  mutations,
  // payload新添加的商品
  // let oldProduct = null;
  // for (let item of state.cartList) {
  //   if (item.iid === payload.iid) {
  //     oldProduct = item;
  //   }
  // }
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每一个方法尽可能完成的事件比较单一一点

  actions,
  getters,
});

// 挂载Vue实例上
export default store;
