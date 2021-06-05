<template>
  <el-col class="comment-box">
    <el-row v-for="(comment,index) in commentData" :key=index>
      <span class="comment-user-name">{{comment.userName}}:</span><span class="comment-item">{{comment.content}}</span></el-row>
  </el-col>
</template>

<script>
export default {
  name: "Comment",
  props: ["commentData"],
  data() {
    return {
      // "commentData": [
      //   {
      //     "userId":"123123",
      //     "userNickName":"user123",
      //     "timeStamp":"2020-3-20",
      //     "content":"我可以帮忙取"
      //   },
      //   {
      //     "userId":"304123",
      //     "userNickName":"user232",
      //     "timeStamp":"2020-3-20",
      //     "content":"闪电速递为您服务"
      //   },
      //   {
      //     "userId":"304123",
      //     "userNickName":"user232",
      //     "timeStamp":"2020-3-20",
      //     "content":"雷打不动的取快递机器人"
      //   }
      // ],
    }
  },
  methods: {
    addComment(comment) {
      this.$prompt('评论', {
        confirmButtonText: '发送',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        //do something
        this.commentData.push(
            {
              "userId":comment.userId,
              "userNickName":comment.userNickName,
              "timeStamp":comment.timeStamp,
              "content":value
            });
      }).catch(() => {
        //do something when failed
      });
    }
  }
}
</script>

<style scoped>

</style>