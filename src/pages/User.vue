<template>
  <el-main>
    <el-col>
      <el-row :span="4" id="img-background"><img src="https://images.pexels.com/photos/216627/pexels-photo-216627.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250"> </el-row>
      <el-row :span="4" class="user-head-container">
        <el-col :span="8" class="user-name-head">
          <img :src="this.$context.user.userAvatarLink" style="height: 1.459rem;width: 1.459rem">
          <span>{{this.$context.user.userName}}</span>
        </el-col>
        <el-col :span="16" class="user-signature">
          <span>希望至美</span>
        </el-col>
      </el-row>
      <el-col class="user-item-group">
        <el-row class="user-info-item" @click.native="switchToChatPage">
          <div class="icon-box">
            <i class="el-icon-chat-line-round" style="font-size: 0.796rem;color:#93bb28"></i>
            <span>我的消息</span>
          </div>
        </el-row>
        <el-row class="user-info-item" @click.native="switchToMyPostPage">
          <div class="icon-box">
            <i class="el-icon-money" style="font-size: 0.796rem;color:#44b0fd"></i>
            <span>我的发布</span>
          </div>
        </el-row>
        <el-row class="user-info-item">
          <div class="icon-box">
            <i class="el-icon-postcard" style="font-size: 0.796rem;color:#ff9b05"></i>
            <span>认证</span>
          </div>
        </el-row>
        <el-row class="user-info-item">
          <div class="icon-box">
            <i class="el-icon-map-location" style="font-size: 0.796rem;color:#08a28dd6"></i>
            <span>园区</span>
          </div>
        </el-row>
      </el-col >
      <el-col class="user-info-item">
        <div class="icon-box">
          <i class="el-icon-phone-outline" style="font-size: 0.796rem;color:#ec87d2"></i>
          <span>客服</span>
        </div>
      </el-col>
    </el-col>
  </el-main>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      "userId":"user123",
      "userName":"userName",
      "userAvatarLink":"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    }
  },
  methods: {
    switchToMyPostPage() {
      this.$router.push("/MyPost");
    },
    switchToChatPage() {
      this.$router.push("/ChatList")
    }
  }
}
</script>

<style scoped>

.el-main {
  margin-top:0.265rem;
}

#img-background {
  max-height: 5.305rem;
  overflow: hidden;
}

#img-background img {
  width: inherit;
  height: inherit;
}

.user-head-container{
  min-height: 1.724rem;
  /*margin-top: -1.061rem;*/
  background-color: blanchedalmond;

  margin-bottom: 0.398rem;
}

.user-info-item:active {
  background-color: rgba(117, 213, 143, 0.93);
  transition: .3s;
  box-shadow: 1px 2px 0px 8px #bac2caa6;
}

.user-info-item {

  display: flex;
  align-items: center;
  margin-bottom: 0.398rem;
  padding-left: 0.265rem;
  width: 100%;
  min-height: 1.459rem;
  text-align: left;
  box-shadow: 0px 2px 12px 1px #e4e8ec87;
  background-color: white;
  font-size: 0.398rem;
}

.user-item-group {
  text-align: left;
}

.user-name-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -0.729rem;
}

.user-name-head img {
  border-radius: 2.653rem;
  background-color: #96d9a6;
  margin-bottom: 0.265rem;
}

.user-name-head span {
  font-weight: bold;
  color: #e68000;
  font-size: 0.398rem;
  font-family: 微软雅黑;
}

.user-signature {
  min-height: 1.326rem;
  max-width: 6.631rem;
  display: flex;
  height: inherit;
  align-items: center;
  justify-content: center;
  font-size: 0.477rem;
}

.icon-box {
  display: flex;
  align-items: center;
}

.icon-box span {
  padding-left: 0.133rem;
}

</style>
