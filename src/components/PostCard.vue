<template>
  <el-col class="post-card">
    <!--    post head-->
    <el-row v-if="isPN != 'true'" class="post-head" type="flex">
      <el-col class="post-head-user" :span="9">
        <UserHeadBox :is-chat="false" :user="{
          'userName': postCardData.userName,
          'avatarLink': postCardData.userAvatarLink,
          'userId':postCardData.posterID,
        }"></UserHeadBox>

      </el-col>
      <el-col class="post-head-like" :span="5">
        <img src="../assets/like.png" height="15rem" width="15rem" @click="upvote"><span>{{postCardData.votes}}</span>
      </el-col>
    </el-row>
    <el-row v-else class="post-head" type="flex">
      <span style="font-size: 0.663rem;">公告</span>
      <i class="el-icon-s-opportunity" style="font-size: 0.796rem;color: lightcoral"></i>
    </el-row>
    <!--    post content(include image sets)-->
    <el-row class="post-content" type="flex">
      <span>{{ this.postCardData.postContent }}</span>
      <div class="img-box">
        <el-image v-for="(img,index) in this.postCardData.imgList" :src=img.src :key=index
                  :preview-src-list=img.preview></el-image>
      </div>
    </el-row>
    <!--    post footer-->
    <el-row class="comment-head" v-if="isPN != 'true'" type="flex">
      <el-col :span="20" class="post-time">
        <span>{{postCardData.time}}</span>
      </el-col>
      <el-col :span="5">
        <span class="price">￥5</span>
      </el-col>
      <el-col :span="5">
        <i @click="addComment" style="font-size: 0.663rem" class="el-icon-chat-dot-round"></i>
      </el-col>
    </el-row>
    <Comment :commentData="postCardData.commentData" v-if="isPN != 'true' " ref="commentChild"></Comment>
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
    }
  },
  methods: {
    addComment() {
      this.$refs.commentChild.addComment();
    },

    upvote() {
      this.postCardData.votes += 1;
    }
  },

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