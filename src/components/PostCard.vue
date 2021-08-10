<template>
  <el-col class="post-card">
    <!--    post head-->
    <el-row v-if="isPN != 'true'" class="post-head" type="flex">
      <el-col class="post-head-user" :span="9">
        <UserHeadBox :is-chat="false" :user="{
          'userName': postCardData.user.userName,
          'avatarLink': postCardData.user.userAvatarLink,
          'userId':postCardData.user.userId,
        }"></UserHeadBox>

      </el-col>
      <el-col class="post-head-like" :span="5">
        <img src="../assets/like.png" height="15rem" width="15rem" @click="upvote"><span>{{postCardData.post.votes}}</span>
      </el-col>
    </el-row>
    <el-row v-else class="post-head" type="flex">
      <span style="font-size: 0.663rem;">公告</span>
      <i class="el-icon-s-opportunity" style="font-size: 0.796rem;color: lightcoral"></i>
    </el-row>
    <!--    post content(include image sets)-->
    <el-row class="post-content" type="flex">
      <span>{{ postCardData.post.postContent }}</span>
      <div class="img-box">
        <el-image v-for="(imgUrl,index) in postCardData.postImgUrls" :src=imgUrl :key=index
                  :preview-src-list=postCardData.postImgUrls></el-image>
      </div>
    </el-row>
    <!--    post footer-->
    <el-row class="comment-head" v-if="isPN != 'true'" type="flex">
      <el-col :span="20" class="post-time">
        <span>{{beautifyTime}}</span>
      </el-col>
      <el-col :span="5">
        <span class="price">￥{{postCardData.post.price}}</span>
      </el-col>
      <el-col :span="5">
        <i @click="addComment" style="font-size: 0.663rem" class="el-icon-chat-dot-round"></i>
      </el-col>
    </el-row>
    <Comment :commentData="postCardData.comment" v-if="isPN != 'true' " ref="commentChild"></Comment>
  </el-col>


</template>

<script>
import Comment from "@/components/Comment";
import UserHeadBox from "@/components/UserHeadBox";

export default {
  name: "PostCard",
  components: {UserHeadBox, Comment},
  props: ["isPN", "postCardData"], /* isPN: isPublicNotice */
  data() {
    return {
      isUpVoted: false,
    }
  },
  methods: {
    addComment() {
      this.$refs.commentChild.addComment(this.postCardData.post.postId);
    },

    upvote() {
      if (this.isUpVoted === true) {
        this.$message({message: "已经点过赞喽~", type: "warning", offset: 80});
      } else if(this.postCardData.post.posterId === this.$context.user.userId){
        this.$message({message: "不能给自己点赞哦~", type: "warning", offset: 80});
      } else {
        this.postCardData.post.votes += 1;
        this.isUpVoted = true;
        this.$axios.get(this.$context.serverUrl + "/upvote?postId=" + this.postCardData.post.postId)
            .then().catch(error => {
          console.log(error);
          this.$message({message: "网络繁忙，等会再点吧！", type: "warning", offset: 80});
        })
      }
    }
  },

  computed: {
    beautifyTime: function() {
      var timeStr = this.postCardData.post.postTime;
      var year = timeStr.substring(0,4)
      var month = timeStr.substring(5,7)
      var day = timeStr.substring(8,10)
      var time = timeStr.substring(11,19)
      var date = new Date(month + " " + day + "," + year + " " + time)
      var now = new Date();
      var diffInHour = (now.getTime() - date.getTime()) / (1000*3600);
      if (diffInHour < 24) {
        return time;
      } else if (diffInHour/24 <= 365) {
        return month + "-" + day;
      } else {
        return year + "-" + month + "-" + day;
      }
    }
  }

}
</script>

<style scoped>

.post-head {
  justify-content: space-between;
  align-items: center;

  padding-top: 0.398rem;
  padding-bottom: 0.133rem;
}

#public-notice .post-head {
  justify-content: flex-start;
}

#public-notice span {
  padding: 0rem 0rem 0.053rem 0.531rem;
}

.post-head-user {
  display: flex;
  justify-content: center;
}

.post-head-like {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 点击时的动画 */
.post-head-like img:active {
  transition: 0.3s ease-in-out;
  height: 35px;
  width: 35px;
}

.post-card {

  background-color: white;
  box-shadow: -2px 10px 20px 0px #eaefef;

  width: 97%;
  margin-left: 0.133rem;
  margin-right: 0.133rem;
  margin-bottom: 0.133rem;
  padding-bottom: 0.212rem;

  /*去除 vue 添加的 float 属性，会导致父盒子高度为 0*/
  float: none;
}

.post-content {
  display: flex;
  flex-direction: column;
}

.post-content span {
  padding: 0.265rem 0.663rem 0.265rem 0.663rem;
  letter-spacing: 0.027rem;
  text-align: left;
  font-size: 0.424rem;
}


.img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 0.398rem 0 0.531rem;
}

.img-box .el-image {
  padding: 0.053rem;
}

.comment-head {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 0.265rem;
}

.post-time {
  text-align: left;
  padding: 0.053rem 0 0.133rem 0.663rem;
  color: #899e949e;
}
</style>