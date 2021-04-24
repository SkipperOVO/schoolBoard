<template>
  <el-main>
    <HeadPane></HeadPane>
<!--    公告板 复用 PostCard -->
    <PostCard is-p-n="true"></PostCard>
    <SaleItemCard></SaleItemCard>
    <SaleItemCard></SaleItemCard>
    <SaleItemCard></SaleItemCard>
    <SaleItemCard></SaleItemCard>
    <SaleItemCard></SaleItemCard>
    <SaleItemCard></SaleItemCard>
  </el-main>
</template>

<script>
import SaleItemCard from "@/components/SaleItemCard";
import HeadPane from "@/components/HeadPane";
import PostCard from "@/components/PostCard";
export default {
  name: "Sale",
  components: {PostCard, HeadPane, SaleItemCard}
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