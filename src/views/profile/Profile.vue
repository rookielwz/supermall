<template>
  <div class="profile">
    <nav-bar><div slot="center">我的档案</div></nav-bar>
    <pro-user-info />
    <pro-account-info />
    <pro-list-view :list-data="orderList" />
    <pro-list-view :list-data="serviceList" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import ProUserInfo from './childComps/ProUserInfo.vue';
import ProAccountInfo from './childComps/ProAccountInfo.vue';
import ProListView from './childComps/ProListView.vue';

export default {
  data() {
    return {
      orderList: [
        {icon: 'message.svg', info: '我的消息'},
        {icon: 'pointer.svg', info: '积分商城'},
        {icon: 'vip.svg', info: '会员卡'},
      ],
      serviceList: [
        {icon: 'cart.svg', info: '我的购物车'},
        {icon: 'shopping.svg', info: '下载购物APP'},
      ]
    }
  },
  components: {
    NavBar,
    ProUserInfo,
    ProAccountInfo,
    ProListView
  }
}
</script>

<style scoped>
.content {
  height: 300px;
  background-color: pink;
  overflow: hidden;
}
</style>
