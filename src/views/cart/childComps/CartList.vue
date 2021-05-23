<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <catr-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      ></catr-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll.vue";
import CatrListItem from "./CatrListItem.vue";
export default {
  components: { Scroll, CatrListItem },
  name: "CartList",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
