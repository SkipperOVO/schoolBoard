<template>
  <el-col v-if="commentData != null" class="comment-box">
    <el-row  v-for="(comment,index) in commentData" :key=index>
      <span class="comment-user-name">{{ comment.posterName }}</span>
      <span v-if="comment.recieverName != null" class="comment-user-name">@{{ comment.recieverName }}</span>
      <span class="comment-item"
            @click="reply({'id':comment.posterId,'name':comment.posterName})">:{{ comment.content }}</span>
    </el-row>

  </el-col>
</template>

<script>
export default {
  name: "Comment",
  props: ["commentData"],
  methods: {
    addComment(postId) {
      this.$prompt('评论', {
        confirmButtonText: '发送',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({value}) => {
        //do something
        let formData = new FormData();
        console.log(postId)
        console.log(this.$context.user.userId)
        formData.append("postId", postId);
        formData.append("posterId", this.$context.user.userId);
        formData.append("posterName", this.$context.user.userName);
        formData.append("content", value);
        this.$axios.post(this.$context.serverUrl + "/addComment", formData)
            .then((response) => {
              // this.commentData.push(
              //     {
              //       "postId": this.commentData.postId,
              //       "posterId": this.$context.user.userId,
              //       "recieverId": null,
              //       "posterName": this.$context.user.userName,
              //       "recieverName": null,
              //       "timeStamp": "2020-3-20",
              //       "content": value
              //     });
              this.commentData.push(response.data.data)
            }).catch((error) => {
          console.log(error)
          this.$message({message: "添加评论失败，请稍后重试", type: "error", offset: 120});
        });
      }).catch(error => {
        console.log(error);
        this.$message({message: "添加评论失败，请稍后重试", type: "error", offset: 120});
      //   this.commentData.push(
      //       {
      //         "postId": this.commentData.postId,
      //         "posterId": this.$context.user.userId,
      //         "recieverId": null,
      //         "posterName": this.$context.user.userName,
      //         "recieverName": null,
      //         "timeStamp": "2020-3-20",
      //         "content": value
      //       });
      })


    },
    reply(who) {
      if (this.$context.user.userId == who.id) {
        this.$message({
          'message': "不能回复自己！",
          'type': 'warning',
        })
        return;
      }
      this.$prompt('回复@' + who.name, {
        confirmButtonText: '发送',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({value}) => {
        //do something
        // 如果服务器写入成功，则更新前端数据
        let formData = new FormData();
        formData.append("postId", this.commentData.postId);
        formData.append("posterId", this.$context.user.userId);
        formData.append("recieverId", who.id);
        formData.append("recieverName", who.name);
        formData.append("content", value);
        this.$axios.post(this.$context.serverUrl + "/replyComment", formData)
            .then((response) => {
              this.commentData.push(response.data.data)
            }).catch(error => {
              console.log(error);
              this.$message({message: "回复评论失败，请稍后重试", type: "error", offset: 60});
        })
        // this.commentData.push(
        //     {
        //       "postId": this.commentData.postId,
        //       "posterId": this.$context.user.userId,
        //       "recieverId": who.id,
        //       "posterName": this.$context.user.userName,
        //       "recieverName": who.name,
        //       "timeStamp": "2020-3-20",
        //       "content": value
        //     });
      }).catch((error) => {
        //do something when failed
        console.log(error)
      });
    }
  }
}
</script>

<style scoped>

</style>