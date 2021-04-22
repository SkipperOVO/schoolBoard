<template>
  <div class="sale-item">
    <div class="img-response-wrapper" >
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" width="100%">
    </div>
    <el-row class="sale-item-bottom">
      <el-col :span="12" style="font-size: 0.265rem">旧汉堡扒</el-col>
      <el-col :span="12" class="bottom clearfix">
        <img src="../assets/like.png" height="15rem" width="15rem" />
        <span  style="font-size: 0.265rem">12</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SaleItemCard"
}
</script>

<style scoped>

.sale-item {
  width: 4.5rem;
  box-shadow: 0px 1px 13px 3px #c1cac09e;
  border-radius: 6px;
  background-color: white;
  margin:0.133rem;
  margin-bottom: 0.318rem;
}

.img-response-wrapper {
  width: inherit;
}

.img-response-wrapper img.image {
  border-radius: 0.159rem 0.159rem 0rem 0rem;
}

.sale-item-bottom {
  padding-bottom: 0.08rem;
}
</style>