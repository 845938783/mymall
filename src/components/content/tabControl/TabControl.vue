<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      defaults() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  background-color: #fff;
  height: 40px;
  line-height: 40px;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
  font-size: 14px;
}
.active {
  color: #ff8196;
}
.active span {
  border-bottom: 3px solid #ff8196;
}
</style>
