<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 列表 -->
    <cart-list></cart-list>
    <!-- 底部工具栏 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
export default {
  name: "Cart",
  components: { NavBar, CartList, CartBottomBar },

  data() {
    return {};
  },
  computed: {
    // 两种写法
    // ...mapGetters(["cartLength", "cartList"]),
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: #ff8196;
  color: #fff;
}
</style>
