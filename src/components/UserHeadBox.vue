<template>
  <div class="user-head-box">
    <div class="user-icon"><img src="../assets/user.png" height="25rem" width="25rem"/></div>
    <div class="user-head-pane">
      <span>userName</span>
      <el-button round class="send-message" >发消息</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserHeadBox"
}

</script>

<style scoped>

.user-head-box {
  display: flex;
  flex-direction: row;
}

.user-head-pane {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-icon img {
  background-color: gray;
  height: 1.194rem;
  width: 1.194rem;
  border-radius: 2.653rem;
}
.user-head-pane span {
  font-size: 0.531rem;
}

.send-message {
  font-size: 0.371rem;
  padding: 0.027rem 0.265rem;
}
</style>