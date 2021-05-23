<template>
  <div class="check-buttom" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButtom",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.check-buttom {
  border-radius: 50%;
  border: 2px solid #ccc;
}
.check {
  border-color: red;
  background: red;
}
</style>
