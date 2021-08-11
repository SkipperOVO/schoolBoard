<template>
    <BScrollWrapper ref="bsWrapper" @scrollToEnd="loadMore">
    <el-main>
      <PostCard v-for="(post,index) in myPostData" :key="index" :post-card-data="post"></PostCard>
    </el-main>
    </BScrollWrapper>
</template>

<script>
import PostCard from "@/components/PostCard";
import BScrollWrapper from "@/components/BScrollWrapper";

export default {
  name: "MyPost",
  components: {BScrollWrapper, PostCard},
  data() {
    return {
      myPostData: [
        {
          "userId": "123123",
          "userAvatar": "",
          "userNickName": "用户123",
          "postContent": "求星期三下午13点从南门取快递到北门，放到门口就行。",
          "timeStamp": "2020-12-03",
          "imgList": [
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"]
            },
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"],
            },
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"]
            },
          ],
          "commentData": [
            {
              "userId": "123123",
              "userNickName": "user123",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            }
          ]
        },
        {
          "userId": "123123",
          "userAvatar": "",
          "userNickName": "用户123",
          "postContent": "求星期三下午13点从南门取快递到北门，放到门口就行。",
          "timeStamp": "2020-12-03",
          "imgList": [
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"]
            },
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"],
            },
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"]
            },
          ],
          "commentData": [
            {
              "userId": "123123",
              "userNickName": "user123",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            }
          ]
        },
        {
          "userId": "123123",
          "userAvatar": "",
          "userNickName": "用户123",
          "postContent": "求星期三下午13点从南门取快递到北门，放到门口就行。",
          "timeStamp": "2020-12-03",
          "imgList": [
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"]
            },
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"],
            },
            {
              "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
              "preview": ["https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"]
            },
          ],
          "commentData": [
            {
              "userId": "123123",
              "userNickName": "user123",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "userId": "304123",
              "userNickName": "user232",
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            }
          ]
        },
      ],
      curPage: 0,
    }
  },


  mounted() {
    if (this.$context.isLogin() == false) {
      this.$message({type:"warning", message:"请先登录", offset:80 });
      this.$router.push("login");
      return ;
    }
    this.fetch("sortByTime",this.curPage);

    this.$context.initBodyHeight();

  },


  methods : {
    fetch(sortBy, curPage) {
      this.curPage = curPage;

      this.$axios.get(this.$context.serverUrl + "/getAllMyPost?posterId=" + this.$context.user.userId
          + "&curPage=" + curPage)
          .then((response) => {
            console.log(response.data.data)
            this.myPostData = this.myPostData.concat(response.data.data);
            this.curPage += 1;
            this.$refs.bsWrapper.refresh();
          }).catch(error => {
        console.log(error)
      })
    },

    loadMore() {
      this.fetch(this.curSortBy, this.curPage);
    },
  },


}
</script>

<style scoped>

</style>