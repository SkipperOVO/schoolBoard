<template>
  <div style="height: 100%;">
  <BScrollWrapper ref="bscroll">
    <el-main class="chat-main">
        <div class="chat-area">
          <div class="message-item" v-for="(chat,index) in chatRecordList" :key="index">
            <UserHeadBox v-if="contextUser.userId != chat.hostId" :is-chat="true" :user="{
            'userName':user.userName,
            'userAvatarLink':user.userAvatarLink,
          }"></UserHeadBox>
            <UserHeadBoxSimple v-else :avatar-link="contextUser.userAvatarLink"></UserHeadBoxSimple>
            <div v-if="contextUser.userId != chat.hostId" class="chat-message-content">
              <span v-if="chat.imgUrl == undefined || chat.imgUrl == ''">{{ chat.content }}</span>
              <van-image  v-else
                          width="120"
                          height="150"
                          fit="cover"
                          :src="chat.imgUrl" class="img-message" @click="previewImages(chat.imgUrl)"></van-image>
            </div>
            <div v-else class="right-message-content">
              <span v-if="chat.imgUrl == undefined || chat.imgUrl == ''">{{ chat.content }}</span>
              <van-image v-else
                         width="120"
                         height="150"
                         fit="cover"
                         :src="chat.imgUrl" class="img-message" @click="previewImages(chat.imgUrl)"></van-image>
            </div>
        </div>
      </div>
    </el-main>
  </BScrollWrapper>
    <div class="input-box">
      <el-input v-model="inputText"></el-input>
      <van-uploader :after-read="afterRead" v-model="imgFileList">
        <i class="el-icon-picture"></i>
      </van-uploader>
      <el-button round type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>

</template>

<script>
import UserHeadBox from "@/components/UserHeadBox";
import UserHeadBoxSimple from "@/components/UserHeadBoxSimple";
import BScrollWrapper from "@/components/BScrollWrapper";
import {ImagePreview} from "vant";

export default {
  name: "Chat",
  components: {BScrollWrapper, UserHeadBoxSimple, UserHeadBox},
  data() {
    return {
      inputText: "",
      chatRecord: {
        messageList: []
      },
      chatRecordList: [],
      user: null,
      contextUser: null,
      ws: null,
      imgFileList: [],
      fileNeedsUpload: 0,
      interval: null,
      uploadedImgUrls: [],
    }
  },

  async created() {
    this.$context.initBodyHeight();

    this.user = this.$route.params.user;
    // 获取 session 聊天记录
    await this.fetch();
    this.contextUser = this.$context.user;
    this.initSocket();

  },


  mounted() {
    if (this.chatRecordList === undefined || this.chatRecordList.length < this.$route.params.chatRecordList) {
      this.fetch();
    }

    this.$nextTick(function(){
      this.$refs.bscroll.refresh();
      this.$refs.bscroll.scollToEndNoDelay();
    })
  },


  methods: {
    async sendMessage() {

      // 如果超时断开连接，重新连接
      await this.reconnect();

      // 发送图片
      if (this.imgFileList.length > 0) {
        let file = this.imgFileList[0];
        file.status = "uploading";
        file.message = "发送中...";

        // // 上传到 七牛云
        this.$axios.get(this.$context.serverUrl + "/getQiniuCloudToken?bucket=chat").then(response => {
          let uploadToken = response.data.data;
          this.$context.uploadImgs(uploadToken, this.imgFileList)
          .then((uploadedImgUrls)=>{

            this.ws.send(JSON.stringify({
              "hostId": this.$context.user.userId,
              "gustId": this.user.userId,
              "content": "",
              "imgUrl": uploadedImgUrls[0]
            }))

            file.status = "done";
            this.imgFileList = []
            this.uploadedImgUrls = []
          })
        }).catch(error=>{
          console.log(error);
          console.log("获取七牛云 Token 失败！")
          this.$message({type: "error", message: "图片发送失败，请稍后重试！", offset: this.$context.offset.high});
        });

        // 发送文本
      } else if (this.inputText != undefined && this.inputText != "") {
        this.ws.send(JSON.stringify({
          "hostId": this.$context.user.userId,
          "gustId": this.user.userId,
          "content": this.inputText,
        }))
      } else return ;   //其他情况不处理

      // 校验
      if (this.inputText.length > 100) {
        this.$message({type: "warning", message:"最长 100 字哦~", offset: this.$context.offset.high});
        return ;
      }


    },

    // 拉取聊天记录
    async fetch() {
      console.log("fetch...")
      this.$axios.get(this.$context.serverUrl + "/getSession?userId="
          + this.$context.user.userId + "&peerId=" + this.user.userId)
        .then(response=>{
          console.log(response)
          if (response.data.code == 200) {
            this.chatRecordList = response.data.data;
            this.$nextTick(function(){
              this.$refs.bscroll.refresh();
              this.$refs.bscroll.scollToEndNoDelay();
            })
          } else {
            this.$message({type: "error", message: "哦呦~服务器开小差了，等会再试吧", offset: this.$context.offset.high});
          }
        }).catch(error=>{
        console.log(error);
      })
    },

    async reconnect() {
      let that = this;
      let interval = setInterval(()=>{
        if (this.ws.readyState == this.ws.OPEN) {
          clearInterval(interval);
        } else if (this.ws.readyState != this.ws.CONNECTING) {
          that.initSocket();
        }
      }, 200);
    },

    initSocket() {
      this.ws = new WebSocket("ws://47.52.64.41:8081/chat/" + this.$context.user.userId + "/" + this.user.userId)
      // this.ws = new WebSocket("ws://localhost:8080/chat/" + this.$context.user.userId + "/" + this.user.userId);

      this.ws.onopen = function() {
        console.log("Connection open ...");
      };

      let that = this;
      this.ws.onmessage = function(response) {
        let res = response.data
        let resj = JSON.parse(res)
        if (resj.code == 200) {
          that.chatRecordList.push({
            "chatRecordId": resj.chatRecordId,
            "time": "刚刚",
            "hostId": resj.hostId,
            "gustId": resj.gustId,
            "content": that.inputText === ""? resj.content : that.inputText,
            "imgUrl": resj.imgUrl,
          })
          that.inputText = ""
          that.$nextTick(function () {
            that.$refs.bscroll.refresh()
            that.$refs.bscroll.scrollToEndOffset(120);
          })
        } else {
          that.$message({type:"error", message:"哦呦！出错了!", offset:that.$context.offset.high});
        }
      };

      this.ws.onclose = function() {
        console.log("Connection closed.");
      };

      this.ws.onerror = function (err) {
        console.log(err)
      }
    },

    previewImages(imgUrl) {
      ImagePreview({
        images: [imgUrl],
        closeable: true,
      });
    },

    afterRead(file) {
      console.log(this.imgFileList)
      let li = []
      li.push(file)
      this.imgFileList = li;
      this.fileNeedsUpload ++;
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
  /*margin-bottom: 0.531rem;*/

}

.chat-main {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-bottom: 2.918rem !important;
  padding-top: 2.52rem !important;
}

.input-box {
  position: fixed;
  bottom: 1.73rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
  padding: 10px 0;
  background-color: white;
  /* margin: 0 0.265rem; */
  border-top: 1px solid #3c3c3c1a;
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
  left: 60px;
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

  text-align: left;
}

.right-message-content span {
  background-color: #ebf8d2;
  padding: 7px 4px;
}

.input-box i:active {
  transition: 0.2s;
  color: #04f841;
}

.input-box>>>.el-input__inner {
  padding-left: 0.265rem;
}

/*发送图片预览*/
.van-uploader__preview {
  position: absolute;
  top: -2.653rem;
}
</style>