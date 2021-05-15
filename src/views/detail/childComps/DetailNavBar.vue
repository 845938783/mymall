<template>
  <div id="DetailNavBar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="titles">
        <div
          v-for="(item, index) in titles"
          class="titles-item"
          :class="{ active: index === currentIndex }"
          @click="detailClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar.vue";
export default {
  components: { NavBar },
  name: "DetailNavBar",

  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    detailClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.titles {
  display: flex;
  font-size: 15px;
}
.titles-item {
  flex: 1;
}
.active {
  color: #ff8196;
}
.back img {
  margin-top: 15px;
}
</style>
