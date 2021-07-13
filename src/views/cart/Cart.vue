<template>
  <div class="cart">
    <!-- 顶部的导航 -->
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartlength}})</div></nav-bar>
    
    <!-- 商品的列表 -->
    <cart-list />
    <!-- 底部的汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters({
      cartlength: 'cartLength'
    })
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 600;
  }
</style>
