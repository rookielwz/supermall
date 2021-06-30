<template>
  <div id="detail">
    <detail-nav-bar class="detai-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages='topImages'/>
      <detail-base-info :goods='goods' />
      <detail-shop-info :shop='shop' />
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad' />
      <detail-param-info :param-info='paramInfo' />
      <detail-comment-info :comment-info='commentInfo' />
      <goods-list :goods='recommends' />
    </scroll>
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

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail';
import { itemListenerMixin } from 'common/mixin';

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
      recommends: []
    }
  },
  mixins: [itemListenerMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求数据
    getDetail(this.iid).then( res => {
      console.log(res)
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

      // 获取推荐信息
      getRecommend().then(res => {
        console.log(res)
        this.recommends = res.data.list
      })
    })
  },
  mounted() {
    
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    imageLoad () {
      this.$refs.scroll.refresh()
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
   height: calc(100% - 44px);
 }
 .detai-nav {
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
</style>