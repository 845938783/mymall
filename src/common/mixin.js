import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop.vue";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    };
  },
  mounted() {
    // 1.图片加载完成的事件监听
    this.refresh = debounce(this.$refs.scroll.refresh, 200);

    this.itemImgListener = () => {
      // refresh()  是scroll内部的   刷新

      this.refresh();
    };

    // 通过接收this.$bus.$emit 发出的事件 来每获取一张图片刷新一次页面滚动高度
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
};

export const BarTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollto(0, 0, 500);
    },
  },
};
