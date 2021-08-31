<template>
  <div class="user-head-box">
    <div class="user-icon"><img :src="user.userAvatarLink" height="25rem" width="25rem"/></div>
    <div class="user-head-pane">
      <div class="tag-box">
        <span>{{user.userName}}</span>
        <el-tag v-if="user.region != null" ref="regionTag" size="mini">{{user.region}}</el-tag>
      </div>
      <el-button  v-if="isChat == false && this.user.userId != this.$context.user.userId"
                  round class="send-message" @click="gotoSendMessage">私信</el-button>
    </div>
  </div>
</template>

<script>

import { AvatarGenerator } from 'random-avatar-generator';

export default {
  name: "UserHeadBox",
  props: ["isChat","user"],
  data() {
    return {
      regionColorMap: {
        "清苑": "red",

      },
      avatarGenerator: new AvatarGenerator(),
    }
  },

  mounted() {

  },

  methods : {

    gotoSendMessage() {
      this.$router.push(
          {
            name: "chat",
            params: {
              user: this.user
            }
          }
      );
    },
  },

  // mounted() {
  //   let regionTag = this.$refs.regionTag;
  //   regionTag.color = this.regionColorMap[this.user.region];
  // }
}

</script>

<style scoped>

.user-head-box {
  display: flex;
  flex-direction: row;
  margin-left: 0.265rem;
}

.user-head-pane {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.user-icon img {
  background-color: gray;
  height: 1.194rem;
  width: 1.194rem;
  border-radius: 2.653rem;
}

.user-head-pane span {
  font-size: 0.345rem;
}

.send-message {
  font-size: 0.371rem;
  padding: 0.027rem 0.265rem;
}

.tag-box {
  display: inline;
  padding-left: 0.265rem;
}

.tag-box .el-tag {
  margin-left: 0.265rem;
}
</style>