<template>
  <el-main>
    <div class="chat-container">
      <div class="chat-area">
        <div class="message-item" v-for="(message,index) in chatRecord.messageList" :key="index">
          <UserHeadBox :is-chat="true" :user="{
            'userName':chatRecord.chatInfo.gustUserName,
            'avatarLink':chatRecord.chatInfo.gustAvatarLink
          }"></UserHeadBox>
          <div class="chat-message-content">{{ message.content }}</div>
        </div>
      </div>
      <div class="input-box">
        <el-input v-model="inputText"></el-input>
        <i class="el-icon-picture"></i>
        <el-button round type="primary">发送</el-button>
      </div>
    </div>
  </el-main>
</template>

<script>
import UserHeadBox from "@/components/UserHeadBox";

export default {
  name: "Chat",
  components: {UserHeadBox},
  data() {
    return {
      inputText: "",
      chatRecord: {
        "chatInfo": {
          "gustUserName": "铁甲小宝",
          "gustAvatarLink": "https://images.pexels.com/photos/7664390/pexels-photo-7664390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
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
            "hostID": 123,
            "gustID": 332,
            "content": "这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息",
          },
          {
            "chatRecordId": 2,
            "time": "",
            "hostID": 123,
            "gustID": 332,
            "content": "这是一条消息",
          },
          {
            "chatRecordId": 3,
            "time": "",
            "hostID": 123,
            "gustID": 332,
            "gustUserName": "铁甲小宝",
            "content": "这是一条消息",
          },
        ]
      }

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
  padding: 7px 4px;
  background-color: #ebf8d2;
  border-radius: 7px;
  max-width: 7.162rem;

  font-size: 0.371rem;
}
</style>