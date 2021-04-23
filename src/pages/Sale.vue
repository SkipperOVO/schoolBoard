<template>
  <el-main>
    <HeadPane></HeadPane>
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
export default {
  name: "Sale",
  components: {HeadPane, SaleItemCard}
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