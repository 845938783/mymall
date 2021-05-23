<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-bar"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
        ref="goods"
      ></detail-goods-info>
      <detail-parami-info
        :param-info="paramInfo"
        ref="parami"
      ></detail-parami-info>

      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-buttom-bar @addCart="addToCart"></detail-buttom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import { debounce } from "common/utils";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamiInfo from "./childComps/DetailParamiInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import { itemListenerMixin, BarTopMixin } from "common/mixin";
import DetailButtomBar from "./childComps/DetailButtomBar.vue";
import { mapActions } from "vuex";

export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamiInfo,
    DetailCommentInfo,
    GoodsList,
    DetailButtomBar,
  },
  name: "Detail",
  mixins: [itemListenerMixin, BarTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      topYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      // messages: "",
      // show: false,
    };
  },
  created() {
    this.$toast.show("请稍等...", 2000);
    // 报存传入的iid
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then((res) => {
      // 获取轮播图数据

      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 获取详情信息
      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // 3.请求推荐数据
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });
      // getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.topYs = [];
        this.topYs.push(0);
        this.topYs.push(this.$refs.parami.$el.offsetTop - 50);
        this.topYs.push(this.$refs.comment.$el.offsetTop - 50);
        this.topYs.push(this.$refs.recommend.$el.offsetTop - 58);
        this.topYs.push(Number.MAX_VALUE);
      }, 100);
      this.$nextTick(() => {});
    });
  },
  mounted() {},
  destroyed() {
    // 2.取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  updated() {},
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scroll.scrollTo(0, -this.topYs[index], 200);
    },
    contentScroll(position) {
      // 获取Y值

      const positoinY = -position.y;
      let length = this.topYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          positoinY >= this.topYs[i] &&
          positoinY < this.topYs[i + 1]
        ) {
          // if (
          //   this.currentIndex !== i &&
          //   ((i < length - 1 &&
          //     positoinY >= this.topYs[i] &&
          //     positoinY < this.topYs[i + 1]) ||
          //     (i === length - 1 && positoinY >= this.topYs[i]))
          // )
          this.currentIndex = i;

          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 1判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
    },

    addToCart() {
      //  1 获取购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车中
      // this.$store.commit("addCart", product);
      this.addCart(product).then((res) => {
        // (this.messages = res), (this.show = true);
        // setTimeout(() => {
        //   this.show = false;
        //   this.messages = "";
        // }, 1500);
        console.log(this.$toast.show);
        this.$toast.show(res, 2000);
      });

      //   this.$store.dispatch("addCart", product).then((res) => {
      //     console.log(res);
      //   });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>
