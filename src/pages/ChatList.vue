<template>

  <BScrollWrapper ref="bsWrapper" @scrollToEnd="loadMore">
      <div class="chat-list-container">
        <div v-for="(chat,index) in chatList" class="chat-item" :key="index">
          <div class="left-part">
            <UserHeadBox :user="{
            'userName': chat.peerName,
            'avatarLink': chat.peerAvatarLink
          }"></UserHeadBox>
            <span class="preview-message">{{ chat.lastMessage }}</span>
          </div>
          <div class="right-part">
            <span>{{ chat.lastTime }}</span>
            <span><el-badge v-if="chat.numNewMesg > 0" :value="chat.numNewMesg"></el-badge></span>
          </div>
        </div>
      </div>
  </BScrollWrapper>
</template>

<script>
import UserHeadBox from "@/components/UserHeadBox";
import BScrollWrapper from "@/components/BScrollWrapper";

export default {
  name: "ChatList",
  components: {BScrollWrapper, UserHeadBox},
  data() {
    return {
      chatList: [
        {
          "peerName": "铁甲小宝",
          "peerAvatarLink": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          "lastTime": "xxxx-xx-xx-xxxx",
          "lastMessage": "和平星我们走！",
          "numNewMesg": 3
        },
        {
          "peerName": "铁甲小宝",
          "peerAvatarLink": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          "lastTime": "xxxx-xx-xx-xxxx",
          "lastMessage": "和舍得离开房间是看得见说两句数量的空间是利空打击势力扩大节省了空间谁看了大家是利空打击数量的空间平星我们走！",
          "numNewMesg": 0
        },
        {
          "peerName": "卡布达",
          "peerAvatarLink": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          "lastTime": "xxxx-xx-xx-xxxx",
          "lastMessage": "和平星我们走！",
          "numNewMesg": 123
        },
        {
          "peerName": "樱桃小丸子",
          "peerAvatarLink": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          "lastTime": "xxxx-xx-xx-xxxx",
          "lastMessage": "和平星我们走！",
          "numNewMesg": 0
        },
      ]
    }
  },

  mounted() {

    this.$context.initBodyHeight();

  }
}
</script>

<style scoped>
.chat-list-container {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  margin-top: 1.592rem
}

.chat-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 7px 0;
  padding-bottom: 2px;

  border-bottom: 1px solid #e8e8e8d1;
}

.chat-item:active {
  transition: 0.3s;
  background-color: #87e2ba;
}

.left-part {
  display: flex;
  flex-direction: row;
  /*position: relative;*/
  align-content: flex-end;
  align-items: flex-end;
  justify-content: flex-start;
}

.left-part img {
  height: 1.326rem;
  width: 1.326rem;
  border-radius: 2.653rem;
}


.right-part {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.preview-message {
  position: absolute;
  left: 65px;
  color: #01040e94;
  max-width: 5.305rem;
  overflow: hidden;
  white-space: nowrap;
}
</style>