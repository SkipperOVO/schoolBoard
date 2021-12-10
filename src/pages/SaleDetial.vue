<template>
  <div class="sale-detial-container">
    <BScrollWrapper ref="bsWrapper">
      <el-main id="saleDetial-main">
        <div class="sale-item-user-box">
          <UserHeadBox :is-chat="false" :user="user"></UserHeadBox>
        </div>
        <el-row class="post-time">
          <span>发布于 {{ beautifyTime }}</span>
        </el-row>
        <el-row class="carousel-box">
          <!--          <el-carousel height="6.101rem">-->
          <!--            <el-carousel-item v-for="(imgUrl,index) in saleDetial.saleItemImgList" :key=index @click="previewImage(index)">-->
          <!--              <el-image class="carousel-img-container" :src="imgUrl"-->
          <!--                        fit="fill"-->
          <!--                        ></el-image>-->
          <!--            </el-carousel-item>-->
          <!--            <el-carousel-item v-if="saleDetial.saleItemImgList === null || saleDetial.saleItemImgList.length === 0">-->
          <!--              <el-image class="carousel-img-container" src="https://images.pexels.com/photos/2088203/pexels-photo-2088203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"-->
          <!--                        fit="fill"-->
          <!--                        :preview-src-list=[]></el-image>-->
          <!--            </el-carousel-item>-->
          <!--          </el-carousel>-->
          <van-swipe :loop="false" style="height: 6rem;">
            <van-swipe-item v-if="saleDetial.saleItemImgList == null || saleDetial.saleItemImgList.length == 0">
              <van-empty description="木有图片呦~"/>
            </van-swipe-item>
            <van-swipe-item v-for="(imageUrl, index) in saleDetial.saleItemImgList" :key="index">
              <img class="swipe-img" :src=imageUrl @click="previewImage(index)"/>
            </van-swipe-item>

          </van-swipe>
        </el-row>
        <el-row class="sale-info-container">
          <el-col class="sale-title">
            <span>{{ saleDetial.postTitle }}</span>
          </el-col>
          <el-col class="price">
            <span>￥</span><span>{{ saleDetial.price }}</span>
          </el-col>
          <el-col class="sale-description">
            <span>{{ saleDetial.postContent }}</span>
          </el-col>
          <el-col class="operation-area">
            <el-button @click="addComment" id="op-bt1" round>说点啥</el-button>
            <el-badge :value="saleDetial.votes" :max="1000" class="item">
              <el-button @click="upvote" @click.stop="" id="op-bt2" round>赞一下</el-button>
            </el-badge>
          </el-col>
        </el-row>
        <el-row class="comment-head" type="flex">
          <el-col :span="3">
            <i @click="addComment" style="font-size: 0.796rem" class="el-icon-chat-dot-round"></i>
          </el-col>
        </el-row>
        <Comment :commentData="comments" ref="commentChild"></Comment>
      </el-main>
    </BScrollWrapper>
  </div>

</template>

<script>
import Comment from "@/components/Comment";
import UserHeadBox from "@/components/UserHeadBox";
import {ImagePreview} from "vant";
import BScrollWrapper from "../components/BScrollWrapper";

export default {
  name: "SaleDetial",
  components: {BScrollWrapper, UserHeadBox, Comment},
  data() {
    return {

      saleDetial: null,
      comments: null,
      user: null,
      isUpVoted: false,
      scroll: null
    }
  },

  mounted() {

    if (this.$route.params.saleItemDetial === undefined) {
      this.saleDetial = this.$context.getLastSaleDetial().saleDetial;
      this.comments = this.$context.getLastSaleDetial().comments;
      this.user = this.$context.getLastSaleDetial().user;
    } else {
      this.saleDetial = this.$route.params.saleItemDetial;
      this.comments = this.$route.params.comments;
      this.user = this.$route.params.user;
    }
    // mounted 方法中必须要 nextTick 才能刷新 bsScroll
    this.$nextTick(()=>{
      this.$refs.bsWrapper.refresh();
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
      this.$refs.bsWrapper.refresh();
    },

    previewImage(index) {
      ImagePreview({
        images: this.saleDetial.saleItemImgList,
        startPosition: index,
        closeable: true,
      });
    },


    upvote() {
      console.log("clicked")
      if (this.isUpVoted === true) {
        this.$message({message: "已经点过赞喽~", type: "warning", offset: this.$context.offset.medium});
      } else if (this.saleDetial.posterId === this.$context.user.userId) {
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
  },

  computed: {
    beautifyTime: function () {
      return this.$context.beautifyTime(this.saleDetial.postTime)
    }
  }
}
</script>

<style scoped>

#saleDetial-main {
  position: relative;
  padding-bottom: 2.6rem;
  padding-top: 0.3rem;
  overflow: hidden;
}

.sale-detial-container {
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;

}

.carousel-box {
  display: flex;
  justify-content: center;
  margin-bottom: 0.663rem;
  /* background-image: url("https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"); */
  width: 80%;
  margin-left: auto;
  margin-right: auto;
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

.swipe-img {
  height: inherit;
}

.post-time {
  text-align: left;
  padding: 0.053rem 0 0.133rem 0.663rem;
  color: #899e949e;
}

</style>
