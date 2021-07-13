<template>
  <div class="check-button" :class="{check: isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    isCheck: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 1px solid #aaa;
  }
  .check {
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>