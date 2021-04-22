<template>
  <el-row :gutter="20" id="tab-nav">
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect"><router-link to="/sale"><img src="../assets/sale.png" height="35px" width="35px"></router-link></el-row>
      <el-row>旧物</el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect"><router-link to="/delivery"><img src="../assets/heart.png" height="35px" width="35px"></router-link></el-row>
      <el-row>代取</el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect"><router-link to="/study"><img src="../assets/exam.png" height="35px" width="35px"></router-link></el-row>
      <el-row>不挂科</el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect"><router-link to="/user"><img src="../assets/user.png" height="35px" width="35px"></router-link></el-row>
      <el-row>我的</el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
    }
  },

}
</script>

<style>

.tab-nav-item {
  margin-top:0.15rem;
}

.noSelect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent; /* transparent with keyword */
  -webkit-tap-highlight-color: rgba(0,0,0,0); /* transparent with rgba */
}

</style>