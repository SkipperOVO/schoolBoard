<template>
    <BScrollWrapper v-loading="isloading"
                    ref="bsWrapper" @scrollToEnd="loadMore">
    <el-main>
      <div v-if="myPostData == undefined || myPostData.length == 0" style="text-align: center">
        <span>没有更多内容</span>
      </div>
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
      isloading: true,
    }
  },


  mounted() {

  },

  activated() {
    if (this.$context.isLogin() == false) {
      this.$message({type:"warning", message:"请先登录", offset: this.$context.offset.high });
      this.$router.push("login");
      return ;
    }
    this.fetch("sortByTime",0);

    this.$context.initBodyHeight();
  },



  methods : {
    fetch(sortBy, curPage) {
      this.curPage = curPage;
      this.isloading = true;

      this.$axios.get(this.$context.serverUrl + "/getAllMyPost?posterId=" + this.$context.user.userId
          + "&curPage=" + curPage)
          .then((response) => {
            if (curPage != 0) {
              this.myPostData = this.myPostData.concat(response.data.data);
            } else this.myPostData = response.data.data;
            this.$refs.bsWrapper.refresh();

            this.curPage += 1;
            this.isloading = false;
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