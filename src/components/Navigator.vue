<template>
  <el-row :gutter="20" id="tab-nav">
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect" @click.native="switchToSalePage"><router-link to=""><img src="../assets/sale.png" height="28px" width="28px"></router-link></el-row>
      <el-row >旧物</el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect" @click.native="switchToDeliveryPage"><router-link to=""><img src="../assets/heart.png" height="28px" width="28px"></router-link></el-row>
      <el-row >代取</el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect" @click.native="switchToStudyPage"><router-link to=""><img src="../assets/exam.png" height="28px" width="28px"></router-link></el-row>
      <el-row >不挂科</el-row>
    </el-col>
    <el-col :span="6" class="tab-nav-item">
      <el-row class="noSelect" @click.native="switchToUserPage"><router-link to=""><img src="../assets/user.png" height="28px" width="28px"></router-link></el-row>
      <el-row >我的</el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      isBack : false,
      curPage: "Sale",
      pathKeySet:
      {
        'Sale':         0,
        'Delivery':     1,
        'Study':        2,
        'User':         3,
        'SaleDetial':   4,
      },
    }
  },
  methods: {
    switchToUserPage() {
      if(this.pathKeySet[this.curPage] > this.pathKeySet['User']) {
        this.isBack = true;
      } else {
        this.isBack = false;
      }
      this.curPage = "User";
      this.$emit("changeSwitchState")
      this.$router.push("/user");
    },
    switchToStudyPage() {
      if(this.pathKeySet[this.curPage] > this.pathKeySet['Study']) {
        this.isBack = true;
      } else {
        this.isBack = false;
      }
      this.curPage = "Study";
      this.$emit("changeSwitchState")
      this.$router.push("/study");
    },
    switchToDeliveryPage() {
      if(this.pathKeySet[this.curPage] > this.pathKeySet['Delivery']) {
        this.isBack = true;
      } else {
        this.isBack = false;
      }
      this.curPage = "Delivery";
      this.$emit("changeSwitchState")
      this.$router.push("/delivery");
    },
    switchToSalePage() {
      if(this.pathKeySet[this.curPage] > this.pathKeySet['Sale']) {
        this.isBack = true;
      } else {
        this.isBack = false;
      }
      this.curPage = "Sale";
      this.$emit("changeSwitchState")
      this.$router.push("/sale");
    },
    switchToSaleDetialPage() {
      if(this.pathKeySet[this.curPage] > this.pathKeySet['SaleDetial']) {
        this.isBack = true;
      } else {
        this.isBack = false;
      }
      this.curPage = "SaleDetial";
      this.$emit("changeSwitchState")
      this.$router.push("/saleDetial");
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