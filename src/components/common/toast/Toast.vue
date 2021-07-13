<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  props: {
    // message: {
    //   type: String
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration=1500) {
      this.message = message
      this.isShow = true
      
      setTimeout(() => {
        this.isShow = false
      }, duration);
    }
  }
  
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    color: #fff;
    white-space: nowrap;
    background-color: rgba(0, 0, 0, .8);
    z-index: 999;
  }
</style>