<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    
    <scroll 
            class="content" 
            ref="scroll" 
            :probe-type='3' 
            @scroll="contentScroll"
            :pull-up-load='true'
            @pullingUp='loadMore'>
      <home-swiper :banners = banners ></home-swiper>
      <recommend-view :recommends = recommends />
      <feature-view />
      <tab-control 
        :titles="['流行','新款','精选']" 
        class="tab-control" 
        @tabClick='tabClick'/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView.vue'
import GoodsList from 'components/content/goods/GoodsList'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils' 

export default {
  name: 'Home',
  data () {
    return {
      banners: [],
      recommends: [],
      currentType: 'pop',
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      isShowBackTop: false
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created () {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods: {
    /* 
     *事件监听的相关方法
     * 
     */
    tabClick (index) {
      switch (index) {
        case 0: 
          this.currentType = 'pop'
          break
        case 1: 
          this.currentType = 'new'
          break
        case 2: 
          this.currentType = 'sell'
          break
      }
    },
    contentScroll (position) {
      this.isShowBackTop = -position.y >1000
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 900)
    },
    loadMore () {
      this.getHomeGoods(this.currentType)
    },
    

    
    /* 
     *网络请求的相关方法
     * 
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
       this.goods[type].list.push(...res.data.list)
       this.goods[type].page +=1

       this.$refs.scroll.finishPullUp()
      })
      
    }
  }
}
</script>

<style scoped>
  #home {
    position: relative;
    padding-top: 43px;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color:#fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
