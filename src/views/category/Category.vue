<template>
  <div class="category">
    <nav-bar class="category_nav"><div slot="center">商品分类</div></nav-bar>
    <div class="category_data">
      <category-list class="left" :list="list"/>
      <category-data class="right" :listData="listData"/>
    </div>
  </div>
</template>

<script>
import { getCategoryList, getSubcategory } from 'network/category.js';

import NavBar from 'components/common/navbar/NavBar.vue';

import CategoryList from './childComps/CategoryList.vue';
import CategoryData from './childComps/CategoryData.vue';

export default {
  components: { 
    CategoryData,
    CategoryList,
    NavBar
  },
  data() {
    return {
      list: [],
      listData: []
    }
  },
  created() {
    this.getCategoryList()

    this.$bus.$on("listClick",(maitKey) => {
      this.getSubcategory(maitKey)
    })
  },
  methods: {
    async getCategoryList() {
      const res = await getCategoryList()
      this.list = res.data.category.list
      this.$bus.$emit('listClick', this.list[0].maitKey)
    },
    async getSubcategory(maitKey) {
      const res = await getSubcategory(maitKey)
      this.listData = res.data.list
    }
  }
}
</script>

<style scoped>
  .category {
    height: 100vh;
  }
  .category_nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
  .category_data {
    display: flex;
    height: calc( 100% - 49px );
  }
  .left {
    width: 80px;
  }
  .right{
    flex: 1;
  }
</style>