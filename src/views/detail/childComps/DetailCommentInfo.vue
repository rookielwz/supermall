<template>
  <div class="comment_info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="header">
      <div>用户评价</div>
      <div>更多</div>
    </div>
    <div class="info_user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="content">
      <p>{{commentInfo.content}}</p>
      <div class="other_info">
        <span class="date">{{commentInfo.created | formatDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
    </div>
    <div class="imgs">
      <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" alt="">
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils';
export default {
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    formatDate(value) {
      const date = new Date(value * 1000)
      return formatDate(date,'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
  .comment_info {
    padding: 10px 10px;
  }
  .header {
    width: 100%;
    display: flex;
    height: 40px;
    padding: 0 5px;
    border-bottom: 1px solid #ccc;
    color: #333;
    font-size: 14px;line-height: 30px;
    line-height: 40px;
  }
  .header div:nth-child(2) {
    text-align: right;
  }
  .header div {
    flex: 1;
  }
  .info_user {
    padding: 10px 5px;
  }
  .info_user img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .info_user span {
    padding-left: 15px;
  }
  .content p {
    padding: 15px 5px;
    font-size: 14px;
  }
  .content .other_info {
    font-size: 13px;
    color: #ccc;
  }
  .content .other_info .date {
    padding-right: 20px;
  }
  .imgs img{
    padding: 5px;
    width: 80px;
    height: 100px;
  }
</style>