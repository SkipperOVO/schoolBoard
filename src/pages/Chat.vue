<template>
  <el-main>
    <div class="chat-container">
      <div class="chat-area">
        <div class="message-item" v-for="(message,index) in chatRecord.messageList" :key="index">
          <UserHeadBox v-if="chatRecord.chatInfo.userId != message.hostID" :is-chat="true" :user="{
            'userName':chatRecord.chatInfo.gustUserName,
            'avatarLink':chatRecord.chatInfo.gustAvatarLink
          }"></UserHeadBox>
          <UserHeadBoxSimple v-else :avatar-link="chatRecord.chatInfo.userAvatarLink"></UserHeadBoxSimple>
          <div v-if="chatRecord.chatInfo.userId != message.hostID" class="chat-message-content"><span>{{ message.content }}</span></div>
          <div v-else class="right-message-content"><span>{{ message.content }}</span></div>

        </div>
      </div>
      <div class="input-box">
        <el-input v-model="inputText"></el-input>
        <i class="el-icon-picture"></i>
        <el-button round type="primary" @click="sendMessage">发送</el-button>
      </div>
    </div>
  </el-main>
</template>

<script>
import UserHeadBox from "@/components/UserHeadBox";
import UserHeadBoxSimple from "@/components/UserHeadBoxSimple";

export default {
  name: "Chat",
  components: {UserHeadBoxSimple, UserHeadBox},
  data() {
    return {
      inputText: "",
      chatRecord: {
        "chatInfo": {
          "gustUserName": "铁甲小宝",
          "gustAvatarLink": "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/baike/s%3D290/sign=6074f893349b033b2888fbd325cf3620/37d12f2eb9389b50fb9c05c58535e5dde6116ec2.jpg",
          "userId": 123,
          "userName": "蜻蜓队长",
          "userAvatarLink": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2661952427,2646895381&fm=26&gp=0.jpg"
        },
        "messageList": [
          {
            "chatRecordId": 0,
            "time": "",
            "hostID": 123,
            "gustID": 332,
            "content": "这是一条消息",
          },
          {
            "chatRecordId": 1,
            "time": "",
            "hostID": 332,
            "gustID": 123,
            "content": "这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息",
          },
          {
            "chatRecordId": 2,
            "time": "",
            "hostID": 332,
            "gustID": 123,
            "content": "这是一条消息",
          },
          {
            "chatRecordId": 3,
            "time": "",
            "hostID": 123,
            "gustID": 332,
            "content": "这是一条消息",
          },
        ]
      }

    }
  },
  methods: {
    sendMessage() {
      this.chatRecord.messageList.push({
        "chatRecordId": 4,
        "time": "",
        "hostID": 123,
        "gustID": 332,
        "content": this.inputText,
      },)
      this.inputText = ""
      this.$nextTick(function(){
        var messages = document.getElementsByClassName("message-item");
        var lastMessage = messages[messages.length-1]
        console.log(lastMessage)
        lastMessage.scrollIntoView()
      })
    }
  }
}
</script>

<style>

.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.chat-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 95%;
  margin-bottom: 30px;

}

.input-box {
  position: fixed;
  bottom: 1.73rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 90%;
  justify-content: space-evenly;
  background-color: white;
}

.input-box i {
  flex-grow: 1;
  font-size: 0.928rem;
  color: #61dca9;
  padding-left: 0.265rem;
}

button.el-button.el-button--primary.is-round {
  margin-left: 0.133rem;
  padding: 0.212rem 0.318rem !important;
}


.chat-message-content {
  position: relative;
  top: -20px;
  left: 50px;
  border-radius: 7px;
  max-width: 7.162rem;
  width: fit-content;

  font-size: 0.371rem;
  display: flex;
}

.message-item {
  width: 100%;
}

.chat-message-content span {
  background-color: #ebf8d2;
  padding: 7px 4px;
}

.right-message-content {
  position: relative;
  top: -20px;
  left: 40px;
  border-radius: 7px;
  max-width: 7.162rem;

  font-size: 0.371rem;
  display: flex;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.right-message-content span {
  background-color: #ebf8d2;
  padding: 7px 4px;
}
</style>