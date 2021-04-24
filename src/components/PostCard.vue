<template>
  <el-col class="post-card">
<!--    post head-->
    <el-row class="post-head" type="flex">
      <el-col class="post-head-user" :span="5" ><img src="../assets/user.png" height="25rem" width="25rem"/><span>用户123</span></el-col>
      <el-col class="post-head-like" :span="5"><img src="../assets/like.png" height="15rem" width="15rem"><span>12</span></el-col>
    </el-row>
<!--    post content(include image sets)-->
    <el-row class="post-content" type="flex">
      <span>求星期三下午13点从南门取快递到北门，放到门口就行。</span>
      <div class="img-box">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
<!--        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">-->
<!--        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">-->
      </div>
    </el-row>
<!--    post footer-->
    <el-row class="comment-head" type="flex">
      <el-col :span="3">
        <span class="price">￥5</span>
      </el-col>
      <el-col :span="5">
        <i style="font-size: 0.663rem" class="el-icon-chat-dot-round"></i>
      </el-col>
    </el-row>
<!--    comment area-->
    <el-col class="comment-box">
      <el-row><span class="comment-user-name">user123:</span><span class="comment-item">我可以帮忙取</span></el-row>
      <el-row><span class="comment-user-name">user123:</span><span class="comment-item">闪电速递为您服务</span></el-row>
      <el-row><span class="comment-user-name">user123:</span><span class="comment-item">雷打不动的取快递机器人</span></el-row>
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

  padding-top: 0.398rem;
  padding-bottom: 0.133rem;
}

.post-head-user {
  display: flex;
  justify-content: center;
}

.post-head-like {
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-card {

  background-color: white;
  box-shadow: -2px 10px 20px 0px #eaefef;

  width: 97%;
  margin-left: 0.133rem;
  margin-right: 0.133rem;
  margin-bottom: 0.133rem;
  padding-bottom: 0.212rem;
}

.post-content {
  display: flex;
  flex-direction: column;
}

.post-content span {
  padding: 0.265rem 0.663rem 0.265rem 0.663rem;
  letter-spacing: 0.027rem;
  text-align: left;
}

.comment-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 84%;
  margin: 0 0.663rem 0 0.663rem;
  padding: 0.106rem;

  background-color: rgba(243, 245, 248, 0.78);
  border-radius: 3px;
}

.img-box {
  margin-bottom: 0.398rem;
}

.comment-head {
  display: flex;
  justify-content: flex-end;
}

.price {
  position: absolute;
  font-size: 0.531rem;

  bottom: 0.008rem;
  text-align: center;

  color: red;
}

.comment-user-name {
  padding-right: 0.106rem;
  color: #868686f5;
}

.comment-item {
  color: #6f6f72;
  font-size: 0.265rem;
  padding: 0.053rem;
}

</style>