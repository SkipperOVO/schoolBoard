<template>

  <BScrollWrapper v-loading="isloading" ref="bsWrapper">
    <div class="chat-list-container">
      <div v-show="chatListData === undefined || chatListData.length == 0" style="text-align: center">
        <span>没有更多内容</span>
      </div>
      <div v-for="(chat,index) in chatListData" :key="index">
        <van-swipe-cell>
          <div class="chat-item" @click="startSession(chat.peerUser, chat.chatRecordList, chat)">
            <div class="left-part">
              <UserHeadBox :user="chat.peerUser"></UserHeadBox>
              <span v-if="chat.chatRecordList[chat.chatRecordList.length - 1].imgUrl == null" class="preview-message">{{ chat.chatRecordList[chat.chatRecordList.length - 1].content }}</span>
              <span v-else class="preview-message">[图片消息]</span>
            </div>
            <div class="right-part">
              <span>{{ beautifyTime(chat.chatRecordList[chat.chatRecordList.length - 1].time) }}</span>
              <span><el-badge v-if="chat.unread > 0" :value="chat.unread"></el-badge></span>
            </div>
          </div>
          <template #right>
            <van-button @click="deleteChatList(chat.peerUser.userId)" square text="删除" type="danger"
                        class="delete-button"/>
          </template>
        </van-swipe-cell>
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
      chatListData: [],
      thisVue: null,
      isloading: true,
    }
  },

  mounted() {
    this.$context.initBodyHeight();

    this.fetch();

    setInterval(()=>{
      this.fetch();
    }, 1000*30)
  },

  activated() {
    this.$refs.bsWrapper.refresh();
  },


  methods: {

    fetch() {
      this.isloading = true;

      this.$axios.get(this.$context.serverUrl + "/getChatList?userId=" + this.$context.user.userId)
          .then(response => {
            console.log(response);
            if (response.data.code == 200) {
              this.chatListData = response.data.data;
            } else {
              this.$message({type: "error", message: "哦呦~服务器开小差了，等会再试吧", offset: this.$context.offset.high});
            }
            this.isloading = false;
          })
    },

    startSession(peerUser, chatRecordList, chat) {
      this.clearUnRead(peerUser.userId, chat);
      this.$router.push(
          {
            name: "chat",
            params: {
              user: peerUser,
              chatRecordList: chatRecordList
            }
          }
      );
    },

    deleteChatList(peerId) {
      this.isloading = true;
      this.$axios.get(this.$context.serverUrl + "/deleteChatList?peerId=" + peerId + "&userId=" + this.$context.user.userId)
          .then(response => {
            console.log(response);
            if (response.data.code == 200) {
              for (var i = 0; i < this.chatListData.length; ++i) {
                var chat = this.chatListData[i];
                if (chat.peerUser.userId == peerId) {
                  this.chatListData.splice(i, 1);
                  break;
                }
              }
              this.isloading = false;
            } else {
              this.$message({type: "error", message: "哦呦~服务器开小差了，等会再试吧", offset: this.$context.offset.high});
              this.isloading = false;
            }
          })
    },

    clearUnRead(peerId, chat) {
      this.$axios.get(this.$context.serverUrl + "/clearUnRead?userId="
          + this.$context.user.userId + "&peerId=" + peerId)
          .then((response)=>{
            console.log(response);
            if (response.data.code == 200) {
              chat.unread = 0;
            }
          }).catch((error)=>{
        console.log(error);
      })
    },

    beautifyTime: function (timeStr) {
      return this.$context.beautifyTime(timeStr)
    }
  },

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