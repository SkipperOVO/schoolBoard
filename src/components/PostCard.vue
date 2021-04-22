<template>
  <el-col class="post-card">
<!--    post head-->
    <el-row class="post-head" type="flex">
      <el-col class="post-head-item" :span="5" ><img src="../assets/user.png" height="25rem" width="25rem"/><span>用户123</span></el-col>
      <el-col class="post-head-item" :span="5"><img src="../assets/like.png" height="12rem" width="12rem"><span>12</span></el-col>
    </el-row>
<!--    post content(include image sets)-->
    <el-row class="post-text" type="flex">
      <span>我的雨和种子沉浸水中 我的花儿落满敞开的枝梢 我的命在闪电的后面雷打不动 那里生死靠着同一把椅子 那里饥饿的孩子给一头猪割草 </span>
      <div class="img-box"><img src="C:\Users\123\Pictures\pic\1.jpg"></div>
    </el-row>
<!--    post footer-->
    <el-row class="comment-btn" type="flex">
      <i class="el-icon-chat-dot-round"></i>
    </el-row>
<!--    comment area-->
    <el-col class="comment-area">
      <el-row><span>user123:</span><span>我的命在闪电的后面雷打不动</span></el-row>
      <el-row><span>user123:</span><span>我的命在闪电的后面雷打不动</span></el-row>
      <el-row><span>user123:</span><span>我的命在闪电的后面雷打不动</span></el-row>
    </el-col>
  </el-col>
</template>

<script>
export default {
  name: "PostCard"
}
</script>

<style scoped>

.post-head {
  justify-content: space-between;
  align-items: center;

  padding-top: 0.133rem;
  padding-bottom: 0.133rem;
}

.post-head-item {
  display: flex;
  justify-content: center;

}
.post-card {

  background-color: white;

  margin-left: 0.133rem;
  margin-right: 0.133rem;
  margin-bottom: 0.133rem;
}

.post-text {
  margin: 0.265rem;

}

.img-box {

}

</style>