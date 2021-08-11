<template>
  <div v-if="isLoaded" class="study-container">
    <HeadPane></HeadPane>

    <BScrollWrapper>
    <el-main id="study-main">
      <PostCard v-for="(post,index) in studyPageData" :key="index" :post-card-data="post"></PostCard>
    </el-main>
    </BScrollWrapper>
  </div>

</template>

<script>
import PostCard from "@/components/PostCard";
import HeadPane from "@/components/HeadPane";
import BScroll from "better-scroll";
import BScrollWrapper from "@/components/BScrollWrapper";

export default {
  name: "Study",
  components: {BScrollWrapper, HeadPane, PostCard},
  data() {
    return {
      studyPageData: [
        {
          "postId":0,
          "userId": "123123",
          "userAvatarLink": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          "userName": "用户123",
          "votes": 12,
          "postContent": "求星期三下午13点从南门取快递到北门，放到门口就行。",
          "time": "2020-12-03",
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
              "commentId":0,
              "postId":0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "commentId":0,
              "postId":0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "commentId":0,
              "postId":0,
              "posterId": 321,
              "recieverId": null,
              "posterName": "user321",
              "recieverName": null,
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            },
            {
              "commentId":0,
              "postId":0,
              "posterId": 123,
              "recieverId": null,
              "posterName": "用户123",
              "recieverName": null,
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            }
          ]
        },
        {
          "userId": "123123",
          "userAvatarLink": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          "userName": "用户123",
          "votes": 12,
          "postContent": "求星期三下午13点从南门取快递到北门，放到门口就行。",
          "time": "2020-12-03",
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
              "commentId":0,
              "postId":0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "commentId":0,
              "postId":0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "commentId":0,
              "postId":0,
              "posterId": 321,
              "recieverId": null,
              "posterName": "user321",
              "recieverName": null,
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            },
            {
              "commentId":0,
              "postId":0,
              "posterId": 123,
              "recieverId": null,
              "posterName": "用户123",
              "recieverName": null,
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            }
          ]
        },
        {
          "userId": "123123",
          "userAvatarLink": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          "userName": "用户123",
          "votes": 12,
          "postContent": "求星期三下午13点从南门取快递到北门，放到门口就行。",
          "time": "2020-12-03",
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
              "commentId":0,
              "postId":0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "commentId":0,
              "postId":0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "commentId":0,
              "postId":0,
              "posterId": 321,
              "recieverId": null,
              "posterName": "user321",
              "recieverName": null,
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            },
            {
              "commentId":0,
              "postId":0,
              "posterId": 123,
              "recieverId": null,
              "posterName": "用户123",
              "recieverName": null,
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            }
          ]
        },
      ],
      isLoaded: false,
      curPage: 0,
    }
  },



  mounted() {
    this.fetch("sortByTime", 0);
    this.curPage += 1;
  },


  methods: {
    fetch(sortBy, curPage) {
      this.$axios.get(this.$context.serverUrl + "/getAllPost?postType=study&sortBy=" + sortBy + "&curPage=" + curPage)
          .then(response => {
            console.log(response.data.data)
            this.studyPageData = response.data.data;

            //更新 Better scroll
            this.$context.initBodyHeight()
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.scrollWrapper, {click: true, tap: true})
            })

            this.isLoaded = true;
          }).catch(error => { console.log(error); })
    },

    clearPage() {
      this.curPage = 0;
    }
  },


}
</script>

<style scoped>


.study-container {
  height: inherit;
}

#study-main {
  padding-bottom: 1.592rem;
}

.scroll-wrapper {
  height: inherit;
}


</style>