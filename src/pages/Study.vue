<template>
  <div class="study-container">
    <HeadPane></HeadPane>

    <BScrollWrapper v-loading="isloading" ref="bsWrapper" @scrollToEnd="loadMore" @pullDown="refresh">
    <el-main id="study-main">
      <div v-if=" studyPageData == undefined || studyPageData.length == 0" style="text-align: center">
        <span>没有更多内容，点击 + 发布</span>
      </div>
      <PostCard v-for="(post,index) in studyPageData" :key="index" :post-card-data="post"></PostCard>
    </el-main>
    </BScrollWrapper>
  </div>

</template>

<script>
import PostCard from "@/components/PostCard";
import HeadPane from "@/components/HeadPane";
import BScrollWrapper from "@/components/BScrollWrapper";

export default {
  name: "Study",
  components: {BScrollWrapper, HeadPane, PostCard},
  data() {
    return {
      studyPageData: [],
      isloading: true,
      curPage: 0,
      curSortBy: "sortByTime",
    }
  },


  mounted() {
    this.$context.mountUser();
    if (this.$context.pageRouter.currentPage === null) {
      this.$context.pageRouter.currentPage = window.location.pathname.substring(1);
    }
    this.fetch("sortByTime", 0);
    this.curPage += 1;

    this.$context.initBodyHeight()
  },

  activated() {
    this.$refs.bsWrapper.refresh();
    if (this.$context.getQueryVariable("refresh") === "true") {
      this.fetch("sortByTime", 0);
      this.curPage += 1;
    }
  },


  methods: {

    fetch(sortBy, curPage) {

      this.isloading = true;
      this.curSortBy = sortBy;
      this.$axios.get(this.$context.serverUrl + "/getAllPost?postType=study&sortBy=" + sortBy + "&curPage=" + curPage)
          .then(response => {
            console.log(response)
            if (curPage === 0) {
              this.studyPageData = []
              this.clearPage();
            }
            this.studyPageData = this.studyPageData.concat(response.data.data);

            this.isLoaded = true;
            this.$refs.bsWrapper.refresh();

            this.curPage += 1;
            this.isloading = false;
          }).catch(error => { console.log(error); })
    },


    loadMore() {
      this.fetch(this.curSortBy, this.curPage);
    },


    refresh() {
      this.fetch(this.curSortBy, 0);
    },

    clearPage() {
      this.curPage = 0;
    }
  },


}
</script>

<style scoped>


.study-container {
  height: inherit;
}

#study-main {
  padding-bottom: 2.387rem;
}

.scroll-wrapper {
  height: inherit;
}


</style>