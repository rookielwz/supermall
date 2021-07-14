<template>
  <div id="detail">
    <detail-nav-bar class="detai-nav" @titleClick='titleClick' ref="nav" />
    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll">
      <detail-swiper :topImages='topImages'/>
      <detail-base-info :goods='goods' />
      <detail-shop-info :shop='shop' />
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad' />
      <detail-param-info ref="params" :param-info='paramInfo' />
      <detail-comment-info ref="comment" :commentInfo='commentInfo' />
      <goods-list ref="recommend" :goods='recommends' />
    </scroll>
    <detail-bottom-bar @addCart='addToCart' />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail';
import { itemListenerMixin, backTopMixin } from 'common/mixin';
import { debounce } from 'common/utils';
import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin,backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求数据
    getDetail(this.iid).then( res => {
      // console.log(res)
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 获取商家信息
      this.shop = new Shop(data.shopInfo)
      // 获取商品的详情数据
      this.detailInfo = data.detailInfo
      // 获取参数信息
      this.paramInfo = new GoodsParam (data.itemParams.info, data.itemParams.rule)
      // 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 获取推荐信息
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100)
  },
  mounted() {

  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position) {
      const positionY = -position.y
      this.isShowBackTop = positionY > 1000

      const length = this.themeTopYs.length

      for(let i = 0; i < length - 1 ; i++){
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] )){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart() {
      const product ={}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      this.addCart(product).then(res => {
        this.$toast.show(res)
      })
    }
  }
}
</script>

<style scoped>
 #detail {
   position: relative;
   z-index: 11;
   background-color: #fff;
   height: 100vh;
 }
 .content {
   height: calc(100% - 44px - 49px);
   background-color: #fff;
 }
 .detai-nav {
   position: relative;
   z-index: 9;
   background-color: #fff;
   color: #333;
 }
</style>