<template>
  <div v-if="commentData != null" class="comment-box">
    <div  class="comment" v-for="(comment,index) in commentData" :key=index>
      <div class="comment-content">
        <span class="comment-user-name">{{ comment.posterName }}</span>
        <span v-if="comment.recieverName != null" class="comment-user-name">@{{ comment.recieverName }}</span>
      <span class="comment-item">:{{ comment.content }}</span>
      </div>
      <div class="comment-operation">
        <span @click="reply({
        'postId':comment.postId,
        'posterId':comment.posterId,
        'posterName':comment.posterName
        })" class="comment-reply-btn">回复</span>
        <span @click="deleteComment(comment.commentId)" v-show="comment.posterId === user.userId" class="comment-delete-btn">删除</span>
      </div>
    </div>
    <span v-if="commentData === null || commentData.length == 0" style="margin: 0 auto;">说点什么呢...</span>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["commentData"],
  data() {
    return {
      user: null,
    }
  },

  mounted() {
    this.user = this.$context.user;
  },

  methods: {
    addComment(postId) {

      if (this.$context.isLogin() == false) {
        this.$message({type:"warning", message:"请先登录", offset:50 });
        this.$router.push("login");
        return ;
      }

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
        if (error != "cancel") {
          this.$message({message: "添加评论失败，请稍后重试", type: "error", offset: 120});
        }
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
      // who 是被回复的评论的信息


      if (this.$context.isLogin() == false) {
        this.$message({type:"warning", message:"请先登录", offset:50 });
        this.$router.push("login");
        return ;
      }

      if (this.$context.user.userId == who.posterId) {
        this.$message({
          'message': "不能回复自己！",
          'type': 'warning',
        })
        return;
      }
      this.$prompt('回复@' + who.posterName, {
        confirmButtonText: '发送',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({value}) => {
        //do something
        // 如果服务器写入成功，则更新前端数据

        let formData = new FormData();
        formData.append("postId", who.postId);
        formData.append("posterId", this.$context.user.userId);
        formData.append("posterName", this.$context.user.userName);
        formData.append("recieverId", who.posterId);
        formData.append("recieverName", who.posterName);
        formData.append("content", value);
        this.$axios.post(this.$context.serverUrl + "/replyComment", formData)
            .then((response) => {
              this.commentData.push(response.data.data)
            }).catch(error => {
              console.log(error);
              this.$message({message: "回复评论失败，请稍后重试", type: "error", offset: 90});
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
    },

    deleteComment(commentId) {

      if (this.$context.isLogin() == false) {
        this.$message({type:"warning", message:"请先登录", offset:50 });
        this.$router.push("login");
        return ;
      }

      this.$axios.get(this.$context.serverUrl + "/deleteComment?commentId=" + commentId)
        .then((response) => {
          if (response.data.code === 200) {
            for (var i = 0; i < this.commentData.length; ++i) {
              var comment = this.commentData[i];
              if (comment.commentId == commentId) {
                this.commentData.splice(i, 1);
                break;
              }
            }
          }
        }).catch(error => {
          console.log(error);
          this.$message({message: "删除失败，请稍后重试", type: "error", offset: 90});
      })
    }
  }
}
</script>

<style scoped>



.comment-user-name {
  padding-right: 0.106rem;
  color: #65d4a6;
  font-size: 0.345rem;
  font-weight: bold;
}

.comment-item {
  color: #6f6f72;
  font-size: 0.371rem;
  padding: 0.053rem;
}


.comment {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.comment-content {
  display: inline;
  width: 100%;
  text-align: left;
}

.comment-operation {
  display: flex;
  width: 25%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
}

.comment-reply-btn {
  padding-right: 0.212rem;
  color: rgb(67 77 86 / 47%);
}

.comment-delete-btn {
  color: rgb(67 77 86 / 47%);
}


</style>