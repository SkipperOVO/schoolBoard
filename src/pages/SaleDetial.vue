<template>
  <div class="scroll-wrapper" ref="scrollWrapper">
    <el-main id="saleDetial-main">
        <div class="sale-item-user-box">
          <UserHeadBox :is-chat="false" :user="user"></UserHeadBox>
        </div>
        <el-row  class="carousel-box">
          <el-carousel height="6.101rem">
            <el-carousel-item v-for="(imgUrl,index) in saleDetial.saleItemImgList" :key=index>
              <el-image class="carousel-img-container" :src="imgUrl"
                        fit="fill"
                        :preview-src-list=saleDetial.saleItemImgList></el-image>
            </el-carousel-item>
            <el-carousel-item v-if="saleDetial.saleItemImgList === null || saleDetial.saleItemImgList.length === 0">
              <el-image class="carousel-img-container" src="https://images.pexels.com/photos/2088203/pexels-photo-2088203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        fit="fill"
                        :preview-src-list=[]></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-row>
        <el-row class="sale-info-container">
          <el-col class="sale-title">
            <span>{{saleDetial.postTitle}}</span>
          </el-col>
          <el-col class="price">
            <span>￥</span><span>{{saleDetial.price}}</span>
          </el-col>
          <el-col class="sale-description">
            <span>{{saleDetial.postContent}}</span>
          </el-col>
          <el-col class="operation-area">
            <el-button @click="addComment" id="op-bt1" round>说点啥</el-button>
            <el-badge :value="saleDetial.votes" :max="1000" class="item">
              <el-button @click="upvote" id="op-bt2" round>赞一下</el-button>
            </el-badge>
          </el-col>
        </el-row>
        <el-row class="comment-head"  type="flex">
          <el-col :span="3">
            <i @click="addComment" style="font-size: 0.796rem" class="el-icon-chat-dot-round"></i>
          </el-col>
        </el-row>
        <Comment :commentData="comments" ref="commentChild"></Comment>
    </el-main>
  </div>

</template>

<script>
import Comment from "@/components/Comment";
import UserHeadBox from "@/components/UserHeadBox";
import BScroll from "better-scroll";
export default {
  name: "SaleDetial",
  components: {UserHeadBox, Comment},
  data() {
    return {
      // saleDetialData: {
      //   "imgList":[
      //     {
      //       "src":"https://images.pexels.com/photos/7363245/pexels-photo-7363245.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      //       "preview":["https://images.pexels.com/photos/4675531/pexels-photo-4675531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]
      //     },
      //     {
      //       "src":"https://images.pexels.com/photos/7363245/pexels-photo-7363245.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      //       "preview":["https://images.pexels.com/photos/4675531/pexels-photo-4675531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]
      //     }
      //   ],
      //   "itemID": "120394",
      //   "itemName":"商品名称",
      //   "posterID":"123112",
      //   "posterName":"poster123",
      //   "price":"5",
      //   "description":"在工作中经常需要对图片进行缩放,但有些缩放会让图片变形,所以今天就给大家介绍 CSS如何实现图片等比例缩放不变形,正在学习CSS的小伙伴赶紧过",
      //   "votes":0,
      //   "commentData": [
      //     {
      //       "commentId":0,
      //       "postId":0,
      //       "posterId": 123,
      //       "recieverId": 321,
      //       "posterName": "user123",
      //       "recieverName": "用户321",
      //       "timeStamp": "2020-3-20",
      //       "content": "我可以帮忙取"
      //     },
      //     {
      //       "commentId":0,
      //       "postId":0,
      //       "posterId": 123,
      //       "recieverId": 321,
      //       "posterName": "user123",
      //       "recieverName": "用户321",
      //       "timeStamp": "2020-3-20",
      //       "content": "闪电速递为您服务"
      //     },
      //     {
      //       "commentId":0,
      //       "postId":0,
      //       "posterId": 321,
      //       "recieverId": null,
      //       "posterName": "user321",
      //       "recieverName": null,
      //       "timeStamp": "2020-3-20",
      //       "content": "雷打不动的取快递机器人"
      //     },
      //     {
      //       "commentId":0,
      //       "postId":0,
      //       "posterId": 123,
      //       "recieverId": null,
      //       "posterName": "用户123",
      //       "recieverName": null,
      //       "timeStamp": "2020-3-20",
      //       "content": "雷打不动的取快递机器人"
      //     }
      //   ],
      // },
      saleDetial: null,
      comments: null,
      user: null,
      isUpVoted: false,
      scroll: null
    }
  },

  mounted() {

    if(this.$route.params.saleItemDetial == undefined) {
      this.saleDetial = this.$context.getLastSaleDetial().saleDetial;
      this.comments = this.$context.getLastSaleDetial().comments;
      this.user = this.$context.getLastSaleDetial().user;
    } else {
      this.saleDetial = this.$route.params.saleItemDetial;
      this.comments = this.$route.params.comments;
      this.user = this.$route.params.user;
    }

    //更新 Better scroll
    this.$context.initBodyHeight();
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.scrollWrapper, {click: true, tap: true})
    })
  },

  beforeDestroy() {
    this.$context.setLastSaleAction({
      user: this.user,
      comments: this.comments,
      saleDetial: this.saleDetial,
      scroolY: 0
    })
  },

  methods: {
    addComment() {
      this.$refs.commentChild.addComment(this.saleDetial.postId);
    },
    upvote() {
      if (this.isUpVoted === true) {
        this.$message({message: "已经点过赞喽~", type: "warning", offset: this.$context.offset.medium});
      } else if(this.saleDetial.posterId === this.$context.user.userId){
        this.$message({message: "不能给自己点赞哦~", type: "warning", offset: this.$context.offset.medium});
      } else {
        this.saleDetial.votes += 1;
        this.isUpVoted = true;
        this.$axios.get(this.$context.serverUrl + "/upvote?postId=" + this.saleDetial.postId)
            .then().catch(error => {
          console.log(error);
          this.$message({message: "网络繁忙，等会再点吧！", type: "warning", offset: this.$context.offset.medium});
        })
      }
    }
  }
}
</script>

<style scoped>

.scroll-wrapper {
  margin-top: 1.592rem;
  height: inherit;
}

#saleDetial-main {
  padding-bottom: 1.326rem;
  margin-top: 0;
}

.sale-detial-container {
  float: none;
  position: relative;
}

.carousel-box {
  display: flex;
  justify-content: center;
  margin-bottom: 0.663rem;
  /*background-image: url("https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");*/

}

.carousel-box el-carousel {
  width: 60%;
}

.el-carousel--horizontal {
  overflow-x: hidden;
  width: 60%;
}

.sale-info-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
}

.sale-info-container .price {
  position: inherit;
}


.sale-title {
  max-width: 5.836rem;
  font-size: 0.531rem;
  margin-bottom: 0.133rem;
  border: 1px solid #7ede7e;
  border-radius: 6px;
}


.sale-description {
  width: 70%;
  font-size: 0.398rem;
  margin: 0.265rem 0 0.743rem 0;
  text-align: justify;
}


.comment-head.el-row.el-row--flex {
  display: flex;
  justify-content: flex-end;
}

.operation-area .el-button {
  cursor: none;
}

.operation-area .el-badge {
  bottom: 0.053rem;
}

#op-bt1 {
  background-color: #65d4a6;
  color: white;
  border: 1px #65d4a6 solid;
}

#op-bt1:active {
  background-color: #2ab32a;
}

#op-bt2 {
  background-color: orange;
  color: white;
  border: 1px #eeb861 solid;
  margin-left: 0.796rem;
}

#op-bt2:active {
  background-color: #ff7b32;
}

.sale-detial-container .comment-head {
  margin-top: 0.531rem;
  justify-content: flex-end;
}

.sale-item-user-box {
  display: flex;
  padding-left: 0.265rem;
}

</style>
