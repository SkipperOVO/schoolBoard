<template>
  <div class="delivery-container" v-if="isLoaded">
    <HeadPane></HeadPane>

    <BScrollWrapper ref="bsWrapper" @scrollToEnd="loadMore" @pullDown="refresh">
      <el-main id="delivery-main">
        <PostCard v-for="(post,index) in deliveryPageData" :key="index" :post-card-data="post"></PostCard>
      </el-main>
    </BScrollWrapper>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
import HeadPane from "@/components/HeadPane";
import BScrollWrapper from "@/components/BScrollWrapper";

export default {
  name: "Delivery",
  components: {BScrollWrapper, HeadPane, PostCard},
  data() {
    return {
      deliveryPageData: [
        {
          "postId": 0,
          "userId": "123123",
          "userAvatarLink": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          "userName": "用户123",
          "postContent": "求星期三下午13点从南门取快递到北门，放到门口就行。",
          "votes": 12,
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
              "commentId": 0,
              "postId": 0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "commentId": 0,
              "postId": 0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "commentId": 0,
              "postId": 0,
              "posterId": 321,
              "recieverId": null,
              "posterName": "user321",
              "recieverName": null,
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            },
            {
              "commentId": 0,
              "postId": 0,
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
              "commentId": 0,
              "postId": 0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "commentId": 0,
              "postId": 0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "commentId": 0,
              "postId": 0,
              "posterId": 321,
              "recieverId": null,
              "posterName": "user321",
              "recieverName": null,
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            },
            {
              "commentId": 0,
              "postId": 0,
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
              "commentId": 0,
              "postId": 0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "我可以帮忙取"
            },
            {
              "commentId": 0,
              "postId": 0,
              "posterId": 123,
              "recieverId": 321,
              "posterName": "user123",
              "recieverName": "用户321",
              "timeStamp": "2020-3-20",
              "content": "闪电速递为您服务"
            },
            {
              "commentId": 0,
              "postId": 0,
              "posterId": 321,
              "recieverId": null,
              "posterName": "user321",
              "recieverName": null,
              "timeStamp": "2020-3-20",
              "content": "雷打不动的取快递机器人"
            },
            {
              "commentId": 0,
              "postId": 0,
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
      scroll: null,
      curSortBy: "sortByTime",
    }
  },


  mounted() {
    this.fetch("sortByTime", 0);
    this.curPage += 1;

    this.$context.initBodyHeight();
  },


  methods: {
    fetch(sortBy, curPage) {

      this.curSortBy = sortBy;

      this.$axios.get(this.$context.serverUrl + "/getAllPost?postType=delivery&sortBy=" + sortBy + "&curPage=" + curPage)
          .then(response => {
            if (curPage === 0) {
              this.deliveryPageData = []
              this.clearPage();
            }
            this.deliveryPageData = this.deliveryPageData.concat(response.data.data);

            this.isLoaded = true;
            //刷新 better scroll
            this.$refs.bsWrapper.refresh();
            if (this.curPage === 0) {
              this.$refs.bsWrapper.scrollTo(0,0, 100);
            }

            this.curPage += 1;
          }).catch(error => {
        console.log(error);
      })
    },


    loadMore() {
      this.fetch(this.curSortBy, this.curPage);
    },


    refresh() {
      this.fetch(this.curSortBy, 0);
    },


    clearPage() {
      this.curPage = 0;
    }
  },


}
</script>

<style scoped>

.scroll-wrapper {
  height: inherit;
}

#delivery-main {
  padding-bottom: 2.387rem;
}

.delivery-container {
  height: inherit;
}

.delivery-container >>> .el-main {
  margin-bottom: 3.979rem !important;
}
</style>