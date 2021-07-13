import { debounce } from './utils';
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      refresh()
      console.log('11')
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 900)
    }
  },
  components: {
    BackTop
  }
}