<template>
  <el-row :gutter="20" id="tab-nav">
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect" @click.native="switchTo('sale')"><router-link to=""><img src="../assets/sale.png" height="28px" width="28px"></router-link></el-row>
      <el-row >旧物</el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect" @click.native="switchTo('delivery')"><router-link to=""><img src="../assets/like.png" height="28px" width="28px"></router-link></el-row>
      <el-row >代取</el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect" @click.native="switchTo('study')"><router-link to=""><img src="../assets/exam.png" height="28px" width="28px"></router-link></el-row>
      <el-row >不挂科</el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect" @click.native="switchTo('user')"><router-link to=""><img src="../assets/user.png" height="28px" width="28px"></router-link></el-row>
      <el-row >我的</el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // data() {
  //   return {
  //     isBack : false,
  //     curPage: "Sale",
  //     pathKeySet:
  //     {
  //       'sale':         0,
  //       'delivery':     1,
  //       'study':        2,
  //       'user':         3,
  //       'saleDetial':   4,
  //     },
  //   }
  // },
  methods: {

    switchTo(pageName) {
      // if(this.pathKeySet[this.curPage] > this.pathKeySet[pageName]) {
      //   this.isBack = true;
      // } else {
      //   this.isBack = false;
      // }
      // this.curPage = pageName;
      // this.$emit("changeSwitchState")
      // this.$context.switchPageContext(pageName);
      this.$router.replace("/" + pageName);
    },
  }

}
</script>

<style>

.tab-nav-item {
  margin-top: 0.133rem;
}


/*去除 a 标签点击时的蓝色背景效果*/
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