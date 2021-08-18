<template>
  <div v-if="isLoaded" class="sale-container">
    <HeadPane></HeadPane>
<!--    <div class="scroll-wrapper" ref="scrollWrapper">-->
    <BScrollWrapper ref="bsWrapper" @scrollToEnd="loadMore" @pullDown="refresh">
      <el-main id="sale-main" >
        <!--    公告板 复用 PostCard -->
        <!--        <PostCard is-p-n="true" id="public-notice" :postCardData="salePageData.publicNotice"></PostCard>-->

        <SaleItemCard v-for="(item,index) in saleItems"
                      :key="index" :saleItemData="item"></SaleItemCard>
      </el-main>
    </BScrollWrapper>
<!--    </div>-->
  </div>
</template>

<script>
import SaleItemCard from "@/components/SaleItemCard";
// import BScroll from 'better-scroll';

// import PostCard from "@/components/PostCard";
import HeadPane from "@/components/HeadPane";
import BScrollWrapper from "@/components/BScrollWrapper";

export default {
  name: "Sale",
  components: {BScrollWrapper, HeadPane, /*PostCard,*/ SaleItemCard},
  data() {
    return {
      salePageData: {},
      saleItems: [],
      curPage: 0,
      isLoaded: false,
      scroll: null,
      curSortBy: "sortByTime",
    }
  },


  mounted() {
    this.fetch("sortByTime", this.curPage);
    this.curPage += 1;


    // 需要初始化合适的 body 的高度，以便 better scroll 可以滚动
    this.$context.initBodyHeight();

  },


  methods: {
    fetch(sortBy, curPage) {
      this.curSortBy = sortBy;

      this.$axios.get(this.$context.serverUrl + "/getAllItem?sortBy=" + sortBy + "&curPage=" + curPage)
          .then(response => {
            console.log(response.data.data)
            if (curPage === 0) {
              this.saleItems = []
              this.clearPage();
            }
            this.saleItems = this.saleItems.concat(response.data.data['items']);
            // 获取当前登录用户信息
            if (response.data.data['user'] != undefined) {
              this.$context.setUserAction(response.data.data['user']);
            }

            this.isLoaded = true;
            //刷新 better scroll
            this.$refs.bsWrapper.refresh();


            this.curPage += 1;
          })
          .catch(error => console.log(error))

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
  overflow: hidden;
}

.sale-container {
  height: inherit;
}

#sale-main {
  display: flex !important;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 2.653rem;
  overflow: hidden;
}

</style>