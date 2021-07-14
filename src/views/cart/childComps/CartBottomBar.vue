<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
                class="check-button" 
                :is-check='isSelectAll'
                @click.native="checkAllclick" />
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton';
import { mapGetters } from 'vuex';
export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥'+this.cartList.filter(item => {
        return item.check
      }).reduce((total,item) => {
        return total + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.check
      }).reduce((total,item) => {
        return total += item.count
      },0)
    },
    isSelectAll() {
      // return !(this.cartList.filter(item => !item.check).length)
      if (!this.cartList.length) return false
        return !this.cartList.find(item => !item.check)
      
    }
  },
  methods: {
    checkAllclick() {
      if(this.isSelectAll){
        this.cartList.forEach(item => item.check = false);
      } else {
        this.cartList.forEach(item => item.check = true);
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择要购买的商品~')
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 49px;
    font-size: 14px;
    line-height: 40px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    width: 60px;
    align-items: center;
    margin-left: 10px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 30px;
    flex: 1;
  }
  .calculate {
    /* display: flex; */
    width: 90px;
    background-color: red;
    text-align: center;
    color: #fff;
  }
</style>