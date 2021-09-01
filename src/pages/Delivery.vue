<template>
  <div class="delivery-container" v-if="isLoaded">
    <HeadPane></HeadPane>

    <BScrollWrapper ref="bsWrapper" @scrollToEnd="loadMore" @pullDown="refresh">
      <el-main id="delivery-main">
        <div v-if="deliveryPageData == undefined || deliveryPageData.length == 0" style="text-align: center">
          <span>没有更多内容，点击 + 发布</span>
        </div>
        <PostCard v-for="(post,index) in deliveryPageData" :key="index" :post-card-data="post"></PostCard>
      </el-main>
    </BScrollWrapper>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
import HeadPane from "@/components/HeadPane";
import BScrollWrapper from "@/components/BScrollWrapper";

export default {
  name: "Delivery",
  components: {BScrollWrapper, HeadPane, PostCard},
  data() {
    return {
      deliveryPageData: [],
      isLoaded: false,
      curPage: 0,
      scroll: null,
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

    this.$context.initBodyHeight();
  },

  activated() {
    this.$context.initBodyHeight();

    if (this.$context.getQueryVariable("refresh") === "true") {
      this.fetch("sortByTime", 0);
      this.curPage += 1;

    }
  },



  methods: {
    fetch(sortBy, curPage) {

      this.curSortBy = sortBy;

      this.$axios.get(this.$context.serverUrl + "/getAllPost?postType=delivery&sortBy=" + sortBy + "&curPage=" + curPage)
          .then(response => {
            console.log(response)
            if (curPage === 0) {
              this.deliveryPageData = []
              this.clearPage();
            }
            this.deliveryPageData = this.deliveryPageData.concat(response.data.data);

            this.isLoaded = true;
            //刷新 better scroll
            this.$refs.bsWrapper.refresh();

            this.curPage += 1;
          }).catch(error => {
        console.log(error);
      })
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

.scroll-wrapper {
  height: inherit;
}

#delivery-main {
  padding-bottom: 2.387rem;
}

.delivery-container {
  height: inherit;
}

.delivery-container >>> .el-main {
  margin-bottom: 3.979rem !important;
}
</style>