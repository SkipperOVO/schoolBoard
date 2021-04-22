<template>
  <el-main>
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
export default {
  name: "Sale",
  components: {SaleItemCard}
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