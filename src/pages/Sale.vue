<template>
  <el-main>
<!--    公告板 复用 PostCard -->
    <PostCard is-p-n="true" id="public-notice"></PostCard>

    <SaleItemCard></SaleItemCard>
    <SaleItemCard></SaleItemCard>
  </el-main>
</template>

<script>
import SaleItemCard from "@/components/SaleItemCard";
import PostCard from "@/components/PostCard";
export default {
  name: "Sale",
  components: {PostCard, SaleItemCard},
  data() {
    return {
      salePageData: {
        "publicNotice":{

        }
      }
    }
  }
}
</script>

<style scoped>


.el-main {
  display: flex !important;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1.459rem;
}

</style>