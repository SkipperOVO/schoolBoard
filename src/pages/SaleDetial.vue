<template>
  <el-main>
    <el-col class="sale-detial-container">
      <el-row  class="carousel-box">
        <el-carousel height="6.101rem">
          <el-carousel-item>
            <el-image class="carousel-img-container" src="https://images.pexels.com/photos/4675531/pexels-photo-4675531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      fit="fill"
                      :preview-src-list="prelist"></el-image>
          </el-carousel-item>
          <el-carousel-item>
            <el-image class="carousel-img-container" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      fit="fill"
                      :preview-src-list="prelist"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-row>
      <el-row class="sale-info-container">
        <el-col class="sale-title">
          <span>商品名称</span>
        </el-col>
        <el-col class="price">
          <span>￥</span><span>5</span>
        </el-col>
        <el-col class="sale-description">
          <span>在工作中经常需要对图片进行缩放,但有些缩放会让图片变形,所以今天就给大家介绍 CSS如何实现图片等比例缩放不变形,正在学习CSS的小伙伴赶紧过</span>
        </el-col>
        <el-col class="operation-area">
          <el-button id="op-bt1" round>说点啥</el-button>
          <el-button id="op-bt2" round>喜欢(12)</el-button>
        </el-col>
      </el-row>
      <el-row class="comment-head"  type="flex">
        <el-col :span="3">
          <i style="font-size: 0.796rem" class="el-icon-chat-dot-round"></i>
        </el-col>
      </el-row>
      <!--    comment area-->
      <el-col class="comment-box" v-if="isPN != 'true'">
        <el-row><span class="comment-user-name">user123:</span><span class="comment-item">我可以帮忙取</span></el-row>
        <el-row><span class="comment-user-name">user123:</span><span class="comment-item">闪电速递为您服务</span></el-row>
        <el-row><span class="comment-user-name">user123:</span><span class="comment-item">雷打不动的取快递机器人</span></el-row>
      </el-col>
    </el-col>
  </el-main>
</template>

<script>
export default {
  name: "SaleDetial",
  data() {
    return {
      prelist:["https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      "https://images.pexels.com/photos/4675531/pexels-photo-4675531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"]
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
