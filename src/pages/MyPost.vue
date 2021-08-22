<template>
    <BScrollWrapper ref="bsWrapper" @scrollToEnd="loadMore">
    <el-main>
      <PostCard v-for="(post,index) in myPostData" :key="index" :post-card-data="post" @deletePost="deletePost"></PostCard>
    </el-main>
    </BScrollWrapper>
</template>

<script>
import PostCard from "@/components/PostCard";
import BScrollWrapper from "@/components/BScrollWrapper";

export default {
  name: "MyPost",
  components: {BScrollWrapper, PostCard},
  data() {
    return {
      myPostData: [],
      curPage: 0,
    }
  },


  mounted() {
    if (this.$context.isLogin() == false) {
      this.$message({type:"warning", message:"请先登录", offset: this.$context.offset.medium });
      this.$router.push("login");
      return ;
    }
    this.fetch("sortByTime",this.curPage);

    this.$context.initBodyHeight();

  },


  methods : {
    fetch(sortBy, curPage) {
      this.curPage = curPage;

      this.$axios.get(this.$context.serverUrl + "/getAllMyPost?posterId=" + this.$context.user.userId
          + "&curPage=" + curPage)
          .then((response) => {
            this.myPostData = this.myPostData.concat(response.data.data);
            console.log(this.myPostData)
            this.curPage += 1;
            this.$refs.bsWrapper.refresh();
          }).catch(error => {
        console.log(error)
      })
    },

    deletePost(postId) {
      for (var i = 0; i < this.myPostData.length; ++i) {
        var postPack = this.myPostData[i];
        if (postPack.post.postId === postId) {
          this.myPostData.splice(i, 1);
          break;
        }
      }
    },

    loadMore() {
      this.fetch(this.curSortBy, this.curPage);
    },
  },


}
</script>

<style scoped>

</style>