<template>
  <div v-if="isLoaded" class="study-container">
    <HeadPane></HeadPane>

    <BScrollWrapper ref="bsWrapper" @scrollToEnd="loadMore" @pullDown="refresh">
    <el-main id="study-main">
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
      isLoaded: false,
      curPage: 0,
      curSortBy: "sortByTime",
    }
  },



  mounted() {

  },

  activated() {
    this.fetch("sortByTime", 0);
    this.curPage += 1;

    this.$context.initBodyHeight()
  },


  methods: {
    fetch(sortBy, curPage) {

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