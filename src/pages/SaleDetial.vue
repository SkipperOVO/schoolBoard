<template>
  <el-main>
    <el-col class="sale-detial-container">
      <el-row  class="carousel-box">
        <el-carousel height="6.101rem">
          <el-carousel-item v-for="(image,index) in this.saleDetialData.imgList" :key=index>
            <el-image class="carousel-img-container" :src="image.src"
                      fit="fill"
                      :preview-src-list=image.preview></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-row>
      <el-row class="sale-info-container">
        <el-col class="sale-title">
          <span>{{this.saleDetialData.itemName}}</span>
        </el-col>
        <el-col class="price">
          <span>￥</span><span>{{this.saleDetialData.price}}</span>
        </el-col>
        <el-col class="sale-description">
          <span></span>
        </el-col>
        <el-col class="operation-area">
          <el-button @click="addComment" id="op-bt1" round>说点啥</el-button>
          <el-badge :value="this.saleDetialData.votes" :max="1000" class="item">
            <el-button @click="upvote" id="op-bt2" round>赞一下</el-button>
          </el-badge>
        </el-col>
      </el-row>
      <el-row class="comment-head"  type="flex">
        <el-col :span="3">
          <i @click="addComment" style="font-size: 0.796rem" class="el-icon-chat-dot-round"></i>
        </el-col>
      </el-row>
      <!--    comment area-->
<!--      <el-col class="comment-box">-->
<!--        <el-row v-for="(comment,index) in this.saleDetialData.commentData" :key=index>-->
<!--          <span class="comment-user-name">{{comment.userNickName}}:</span><span class="comment-item">{{comment.content}}</span></el-row>-->
<!--      </el-col>-->
      <Comment :commentData="saleDetialData.commentData" ref="commentChild"></Comment>
    </el-col>
  </el-main>
</template>

<script>
import Comment from "@/components/Comment";
export default {
  name: "SaleDetial",
  components: {Comment},
  data() {
    return {
      saleDetialData: {
        "imgList":[
          {
            "src":"https://images.pexels.com/photos/7363245/pexels-photo-7363245.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "preview":["https://images.pexels.com/photos/4675531/pexels-photo-4675531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]
          },
          {
            "src":"https://images.pexels.com/photos/7363245/pexels-photo-7363245.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "preview":["https://images.pexels.com/photos/4675531/pexels-photo-4675531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]
          }
        ],
        "itemID": "120394",
        "itemName":"商品名称",
        "posterID":"123112",
        "posterName":"poster123",
        "price":"5",
        "description":"在工作中经常需要对图片进行缩放,但有些缩放会让图片变形,所以今天就给大家介绍 CSS如何实现图片等比例缩放不变形,正在学习CSS的小伙伴赶紧过",
        "votes":0,
        "commentData": [
          {
            "userId":"123123",
            "userName":"user123",
            "timeStamp":"2020-3-20",
            "content":"我可以帮忙取"
          },
          {
            "userId":"304123",
            "userName":"user232",
            "timeStamp":"2020-3-20",
            "content":"闪电速递为您服务"
          },
          {
            "userId":"304123",
            "userName":"user232",
            "timeStamp":"2020-3-20",
            "content":"雷打不动的取快递机器人"
          }
        ],
      },
    }
  },

  methods: {
    addComment() {
      this.$refs.commentChild.addComment({"userId":"1230123","userName":"user000","timeStamp":"---"});
    },
    upvote() {
      this.saleDetialData.votes += 1;
    }
  }
}
</script>

<style scoped>

.carousel-box {
  display: flex;
  justify-content: center;
  margin-bottom: 0.663rem;
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
}

.sale-title span {
  border: 1px #61dca9 solid;
  padding: 0.08rem;
  border-radius: 0.159rem;
}

.sale-description {
  width: 70%;
  font-size: 0.398rem;
  margin: 0.265rem 0 0.743rem 0;
  text-align: justify;
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


</style>
