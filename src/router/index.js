import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("../views/home/Home");
const Cart = () => import("../views/cart/Cart");
const Category = () => import("../views/category/Category");
const Profile = () => import("../views/profile/Profile");
const Detail = () => import("../views/detail/Detail");

// 1.安装插件
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  console.log("-----");
  return originalPush.call(this, location).catch((err) => err);
};
// 2.创建router

// 2.1 配置映射关系
const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/detail/:iid",
    component: Detail,
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

// 3.导出routert

export default router;
