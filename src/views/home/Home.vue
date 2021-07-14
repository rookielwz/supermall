<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
        :titles="['流行','新款','精选']" 
        @tabClick='tabClick'
        ref="tabControl1"
        class="tab-control" v-show="isTabFixed"/>
        
    <scroll 
            class="content" 
            ref="scroll" 
            :probe-type='3' 
            @scroll="contentScroll"
            :pull-up-load='true'
            @pullingUp='loadMore'>
      <home-swiper 
                  :banners = banners 
                  @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend-view :recommends = recommends />
      <feature-view />
      <tab-control 
        :titles="['流行','新款','精选']" 
        class="tab-control" 
        @tabClick='tabClick'
        ref="tabControl2"/>
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

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { itemListenerMixin,backTopMixin } from 'common/mixin';

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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  mixins: [itemListenerMixin,backTopMixin],
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
    Scroll
  },
  created () {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()

    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  mounted () {
    // 1.图片加载完成的事件监听
    
  },
  updated() {
    console.log("111")
    this.$refs.scroll.refresh()
  },
  methods: {
    /* 
     *事件监听的相关方法
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll (position) {
      // 判断backTop是否显示
      this.isShowBackTop = -position.y > 1000
      // 判断tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore () {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }, 
    /* 
     *网络请求的相关方法
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
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color:#fff;
    z-index: 9;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 45px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>
