<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="LoadMore"
      :probe-type="3"
      :pull-up-load="true"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils.js";
import { itemListenerMixin, BarTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, BarTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      taboffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollto(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1。保存Y值
    this.saveY = this.$refs.scroll.getScrollY();

    // 2.取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  created() {
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("new");
    this.getHomeGoods("pop");
    this.getHomeGoods("sell");
    this.$toast.show(" 数据请求中,请稍后", 1500);
  },
  mounted() {},
  methods: {
    /*
      事件监听相关方法
    */

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    swiperImageLoad() {
      this.taboffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    /*
      网络请求相关方法
    */

    getHomeMultidata() {
      // 1.请求多个数据  轮播图的数据
      getHomeMultidata().then((res) => {
        // 1.1函数在执行完后会被回收，内容会消失
        // 所以需要用一个变量来保存里面的数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      this.$toast.show("数据加载中...", 1000);
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },

    // 加载跟多图片
    LoadMore() {
      this.getHomeGoods(this.currentType);
    },

    //当滑动的距离大于1000时隐藏  小于1000时显示
    contentScroll(position) {
      // 1判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = -position.y > this.taboffsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */

  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: #ff8196;
  color: #fff;
}

.content {
  height: calc(100% - 93px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 0px;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
