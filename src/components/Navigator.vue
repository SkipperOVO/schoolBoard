<template>
  <el-row :gutter="20" id="tab-nav">
    <el-col :span="6" class="tab-nav-item">
      <el-row><img src="../assets/sale.png" height="35px" width="35px"></el-row>
      <el-row><span>旧物</span></el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row><img src="../assets/heart.png" height="35px" width="35px"></el-row>
      <el-row><span>代取</span></el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row><img src="../assets/exam.png" height="35px" width="35px"></el-row>
      <el-row><span>不挂科</span></el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row><img src="../assets/user.png" height="35px" width="35px"></el-row>
      <el-row><span>我的</span></el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  methods: {
    switchTab() {
      this.active = (this.active + 1) % 3;
    }
  }

}
</script>

<style>

.tab-nav-item {
  margin-top:0.15rem;
}

</style>