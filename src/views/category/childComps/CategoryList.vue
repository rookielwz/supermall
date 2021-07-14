<template>
  <div class="category_list" v-if="Object.keys(list) !== 0">
    <scroll class="content" ref="scroll">
      <div v-for="(item, index) in list " 
        :key="index" 
        :class="{active:index===currentIndex}" 
        class="category_list_item"
        @click="itemClick(index, item.maitKey)">
        {{item.title}}
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';

export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Scroll
  },
  methods: {
    itemClick(index, maitKey) {
      this.currentIndex = index
      this.$bus.$emit("listClick", maitKey)
    }
  }
}
</script>

<style scoped>
  .category_list {
    text-align: center;
    line-height: 45px;
    font-size: 14px;
  }
  .category_list_item {
    width: 80px;
    height: 45px;
    background-color: #f6f6f6;
  }
  .active {
    background-color: #fff;
    border-left: 3px solid var(--color-tint);
    color: var(--color-tint);
  }
  .content {
    height: calc( 100% - 44px);
    overflow: hidden;
  }
</style>