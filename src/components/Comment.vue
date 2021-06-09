<template>
  <el-col class="comment-box">
    <el-row v-for="(comment,index) in commentData" :key=index>
      <span class="comment-user-name">{{comment.posterName}}</span>
      <span v-if="comment.recieverName != null" class="comment-user-name">@{{comment.recieverName}}</span>
      <span class="comment-item" @click="reply({'id':comment.posterId,'name':comment.posterName})">:{{comment.content}}</span>
    </el-row>

  </el-col>
</template>

<script>
export default {
  name: "Comment",
  props: ["commentData"],
  methods: {
    addComment() {
      this.$prompt('评论', {
        confirmButtonText: '发送',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        //do something
        this.commentData.push(
            {
              "commentId":0,
              "postId":this.commentData.postId,
              "posterId": this.$root.user.userId,
              "recieverId": null,
              "posterName": this.$root.user.userName,
              "recieverName": null,
              "timeStamp": "2020-3-20",
              "content": value
            });
      }).catch(() => {
        //do something when failed
      });
    },
    reply(who) {
      if(this.$root.user.userId == who.id) {
        this.$message({
          'message': "不能回复自己！",
          'type': 'warning',
        })
        return ;
      }
      this.$prompt('回复@' + who.name, {
        confirmButtonText: '发送',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        //do something
        // 如果服务器写入成功，则更新前端数据
        this.commentData.push(
            {
              "commentId":0,
              "postId":this.commentData.postId,
              "posterId": this.$root.user.userId,
              "recieverId": who.id,
              "posterName": this.$root.user.userName,
              "recieverName": who.name,
              "timeStamp": "2020-3-20",
              "content": value
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