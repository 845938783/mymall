<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { getHomeMultidata } from "network/home";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";

export default {
  name: "Home",
  components: { NavBar, HomeSwiper, RecommendView },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },

  created() {
    // 1.请求多个数据
    getHomeMultidata().then((res) => {
      // 1.1函数在执行完后会被回收，内容会消失
      // 所以需要用一个变量来保存里面的数据
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      console.log(this.banners);
    });
  },
};
</script>

<style scoped>
.home-nav {
  background-color: #ff8196;
  /* background-color: var(--color-tint); */
  color: #fff;
}
</style>
