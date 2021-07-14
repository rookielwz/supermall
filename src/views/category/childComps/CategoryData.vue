<template>
  <div class="category_data">
    <scroll class="content" ref="scroll">
      <div class="main">
        <a class="category_data_item" v-for="(item, index) in listData" :key="index" :href="item.link">
          <img :src="item.image" alt="">
          <div class="text">{{item.title}}</div>
        </a>
      </div>
    </scroll>
    
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';
import { debounce } from 'common/utils';

export default {
  data() {
    return {
      maitKey: null,
      list: []
    }
  },
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped>
  .content {
    height: 100%;
  }
  .category_data {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    overflow: hidden;
  }
  .main {
    display: flex;
    flex-wrap: wrap;
  }
  .category_data_item {
    display: block;
    width: 33%;
    height: 120px;
    text-align: center;
    font-size: 14px;
  }
  .category_data_item img {
    width: 80px;
    padding-bottom: 5px;
  }
</style>