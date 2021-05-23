<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-buttom
        class="check-buttom"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calc" @click="calcClick">结算({{ calcLate }})</div>
  </div>
</template>

<script>
import CheckButtom from "../../../components/content/checkButtom/CheckButtom.vue";
import { mapGetters } from "vuex";
export default {
  components: { CheckButtom },
  name: "CartBottomBar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    calcLate() {
      // 获取商品的数量
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // 计算全选与不全选
      // 使用filter
      // return !this.cartList.filter((item) => !item.checked).length;

      if (this.cartList.length >= 1) {
        // 使用find
        return !this.cartList.find((item) => !item.checked);
      }
      return false;
    },
  },
  methods: {
    checkClick() {
      // 全选与不全选
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-buttom {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  flex: 1;
  margin-left: 20px;
}
.calc {
  width: 70px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
