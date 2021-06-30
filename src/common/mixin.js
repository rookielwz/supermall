import { debounce } from 'common/utils';

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  components: {

  },
  methods: {

  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    console.log('混入中的内容')
  }
}